#!/usr/bin/env zx
import addRecordToNotion from './notion.js'

$.verbose = false

async function getUrl() {
	const url = await $`osascript -e 'tell application "Google Chrome" to return URL of active tab of front window'`
  return url.toString().trim()
}

function echoMessage(url) {
	const actualUrl = chalk.underline(url)
	const pageName = chalk.green('TODAY I DISCOVERED')
	const appName = chalk.green('Notion')
	echo `Na stránku ${pageName} v aplikaci ${appName} bude uložen odkaz: ${actualUrl}}`
}

async function main() {
	const url = await getUrl()
	echoMessage(url)
	const description = await question(chalk.cyan('Zadejte prosím krátký popis: '))
	await addRecordToNotion(url, description)
	echo `Odkaz byl uložen.`
}

main()