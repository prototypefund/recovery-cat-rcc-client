const fs					= 	require('fs')
const path					= 	require('path')
const extract_translations 	= 	getParam('extract','.')
const output				= 	getParam('output', '')
const import_translations	=	getParam('import', '')
const languages 			= 	getParam('lang', 'lang=de,en', true)
const spread_translations	=	getParam('spread','')

function getParam(param, def = '', array = false){
	const regex 	= new RegExp(param+'=')
	const result 	= (process.argv.filter( x => x.match(regex))[0] || def).split('=')[1]

	if(!result) return null

	return 	array
			?	result.split('')
			:	result
			
}

function getLanguageFiles(str = ''){
	const regex = new RegExp('(?<=[\'`"])[^\'`"]*('+languages.join('|')+')\\.json','mgi')
	const matches = str.match(regex)

	return  matches || []
}

function getScope(str = ''){
	const match = str.match(/TranslationsModule\w*\.\w*forChild\([\'`"](.*)[\'`"][^)]*\)/)
	return match && match[1]
}

function getLanguageCode(path_to_file){
	const match = path_to_file.match(/([^\/]+)\.json$/)
	return match && match[1]
}

function isTranslationFile(path_to_file){

	if(!languages.includes(getLanguageCode(path_to_file))) return false

	try{
		const json = require('./'+path_to_file)	
		return true

	} catch(e) {
		console.log(e)
		return false
	}
}



function scopeAndPath(path_to_file) {

	if(!path_to_file.match(/\.ts$|.js$/)) return false

	
	const contents 			= fs.readFileSync(path_to_file, 'utf-8') 
	
	const language_files 	= getLanguageFiles(contents)
	
	if(language_files.length == 0) return null

	var map = {}
	

	language_files.forEach( file => {

		const lang 	= getLanguageCode(file)

		map[lang]	= path.join(path.dirname(path_to_file), file)

	})

	const scope	= getScope(contents)
	
	if(!scope) return null

	return {scope, map}
}



function readRdirSync(base = '.') {
	return	fs.readdirSync(base) 
			.map( filename => {
				const path_to_file = path.join(base, filename)
				return 	fs.statSync(path_to_file).isDirectory()
						?	readRdirSync(path_to_file)
						:	path_to_file		

			})
			.flat()
}

function getModulesWithTranslations(dir) {

	return 	readRdirSync(dir)
			.map(scopeAndPath)
			.filter( x => !! x)

}

function extractTranslationTables(dir){

	var translations = {}

	getModulesWithTranslations(dir)
	.forEach( x => {
		Object.keys(x.map).forEach( lang => {
			translations[lang] = translations[lang] || {}
			translations[lang][x.scope] = JSON.parse(fs.readFileSync(x.map[lang], 'utf-8'))
		})
	})

	return translations
}


function spreadTranslations(translations, src){
	getModulesWithTranslations(src)
	.forEach( ({scope, map }) => {		

		Object.keys(translations).forEach( lang => {			
			console.log(map[lang])
		})
	})
}


function alignTranslations(translations){
	var skeleton = mergeKeys(Object.values(translations))	

	return Object.keys(translations).reduce( (result, lang) => ({ ...result, [lang]: fillKeys(translations[lang], skeleton)}), {} )
}

function mergeKeys(objects){

	var 	skeleton 	= 	{}
	const	keys		= 	Array.from(new Set(
								objects.map( o => typeof o == 'string' ? null : Object.keys(o) )
								.flat().filter( x => !!x ) 
							) )


	keys.length > 0
	?	keys.forEach( key => skeleton[key] = mergeKeys(objects.map( o => o[key] || {}) ) )
	:	skeleton = null

	return skeleton

}


function fillKeys(obj, skeleton){

	if(!skeleton) return null

	const 	keys 	= Object.keys(skeleton)
	var 	result 	= {}


	keys.forEach( key => {
		result[key] = 	(typeof obj[key] == 'object' && obj[key])
						?	fillKeys(obj[key], skeleton[key])
						:	obj[key] || null
	})

	return result
}





function importTranslations(path){
	const files = readRdirSync(path)

	if(files.length == 1) return JSON.parse(fs.readFileSync(path, 'utf-8'))

	return 	files.reduce( (result, path ) => {
				return {...result, [getLanguageCode(path)] : JSON.parse(fs.readFileSync(path, 'utf-8')) }
			}, {})

}


var translations = {}


if(import_translations){
	process.stdout.write('\n')
	process.stdout.write('Importing from '+import_translations+' ... ')
	translations = importTranslations(import_translations)
	process.stdout.write(Object.keys(importTranslations(import_translations)).join(', '))
	process.stdout.write(' [ok]\n')
}

if(extract_translations){
	process.stdout.write('\n')
	process.stdout.write('Extracting from '+extract_translations+' ... ')
	translations = (alignTranslations(extractTranslationTables(extract_translations)))
	process.stdout.write(Object.keys(translations).join(', '))
	process.stdout.write(' [ok]\n')
}

if(spread_translations){
	process.stdout.write('\n')
	process.stdout.write('Spreading to '+spread_translations+' ... ')	
	process.stdout.write(Object.keys(translations).join(', '))
	spreadTranslations(translations, spread_translations)
	process.stdout.write(' [ok]\n')	
}

if(output){

	process.stdout.write('\n')
	process.stdout.write('Exporting to '+output+' ... ')	
	process.stdout.write(Object.keys(translations).join(', '))
	process.stdout.write(' [ok]\n\n')	
	fs.mkdirSync(output, { recursive: true })

	Object.keys(translations).forEach( lang => {
		fs.writeFileSync(output+'/'+lang+'.json', JSON.stringify(translations[lang], null, 4))
	})

} else {
	//console.dir( translations , {depth:20})
}


