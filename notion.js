import { Client } from "@notionhq/client";
import dotenv from "dotenv";
import { Heading, ParagraphWithLink } from "./object-helpers.js";

dotenv.config({ path: `${__dirname}/.env`});

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const pageId = process.env.NOTION_PAGE_ID;
const today = new Date().toISOString().split("T")[0];


export default async function addRecordToNotion(url, text) {
  const pageBlocks = await getPageBlocks(pageId);
  const todaysBlock = (await findTodaysBlock(pageBlocks)) || (await appendBlockToPage(pageId, today));
  await addChildToBlock(todaysBlock, text, url);
}

async function appendBlockToPage(pageId, title) {
  const response = await notion.blocks.children.append({
    block_id: pageId,
    children: [ new Heading(title) ],
  });

  return response.results[0].id;
}

async function getPageBlocks(pageId) {
  const response = await notion.blocks.children.list({
    block_id: pageId,
  })

  return response.results;
}

function findTodaysBlock(blocks) {
  const todaysBlock = blocks.find((block) => {
    if (block.type === "heading_3") {
      const text = block.heading_3?.rich_text[0].plain_text;
      return text === today;
    }
    return false;
  });
 
  return todaysBlock?.id;
}

function addChildToBlock(blockId, text, url) {
    return notion.blocks.children.append({
    block_id: blockId,
    children: [ new ParagraphWithLink(text, url) ],
  });
}
