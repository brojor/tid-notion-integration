class Block {
	constructor() {
			this.object = "block";
	}
}

export class Heading extends Block {
	constructor(title, level = 3, isToggleable = true) {
			super();
			this.type = "heading_" + level;
			this[`heading_${level}`] = {
					rich_text: [{ type: "text", text: { content: title } }],
					is_toggleable: isToggleable,
			};
	}
}

export class ParagraphWithLink extends Block {
	constructor(text, url) {
			super();
			this.type = "paragraph";
			this.paragraph = {
					rich_text: [{ type: "text", text: { content: text, link: { url } } }],
			};
	}
}