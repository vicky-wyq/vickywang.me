const page=await figma.getNodeByIdAsync('253:137');await figma.setCurrentPageAsync(page);
if(page.children.some(n=>n.name==='Vicky Wang · Current resume'))return {status:'Existing resume found; inspect before retry.'};
await Promise.all(['Regular','Medium','Semi Bold'].map(style=>figma.loadFontAsync({family:'Inter',style})));
const collections=await figma.variables.getLocalVariableCollectionsAsync();const collection=collections.find(c=>c.id==='VariableCollectionId:256:100');
const variables=await Promise.all(collection.variableIds.map(id=>figma.variables.getVariableByIdAsync(id)));const vars=Object.fromEntries(variables.map(v=>[v.name,v]));
const ids=[];const styles={};const styleIds=[];const track=n=>{ids.push(n.id);return n;};
function paint(name){return figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',vars[name]);}
function fill(n,name){n.fills=[paint(name)];}
for(const [name,size,weight,leading] of [['Name',29,'Semi Bold',118],['Subtitle',13,'Medium',145],['Label',10.5,'Medium',150],['Body',12.5,'Regular',140],['Job',14,'Semi Bold',140],['Meta',10.5,'Regular',145],['Metric',20,'Semi Bold',130]]){const style=figma.createTextStyle();style.name='Workroom/Resume/'+name;style.fontName={family:'Inter',style:weight};style.fontSize=size;style.lineHeight={unit:'PERCENT',value:leading};style.letterSpacing={unit:'PERCENT',value:name==='Label'?7:0};style.description='Editable resume. Inter substitute; website primary font General Sans is unavailable in this Figma connection.';styles[name]=style;styleIds.push(style.id);}
function frame(parent,name,width,gap=12){const f=track(figma.createAutoLayout('VERTICAL'));f.name=name;f.fills=[];parent.appendChild(f);f.resize(width,10);f.primaryAxisSizingMode='AUTO';f.counterAxisSizingMode='FIXED';f.itemSpacing=gap;return f;}
async function text(parent,name,content,role,color='text',width){const t=track(figma.createText());t.name=name;t.fontName=styles[role].fontName;t.characters=content;parent.appendChild(t);await t.setTextStyleIdAsync(styles[role].id);fill(t,color);t.textAutoResize='HEIGHT';t.resize(width||parent.width,Math.max(1,t.height));return t;}
function line(parent,width){const n=track(figma.createRectangle());n.name='Divider';parent.appendChild(n);n.resize(width,1);fill(n,'border');return n;}
async function label(parent,value){return text(parent,value,value,'Label','faint');}
const sheet=frame(page,'Vicky Wang · Current resume',816,24);sheet.x=48;sheet.y=48;sheet.minHeight=1056;for(const field of ['paddingLeft','paddingRight','paddingTop','paddingBottom'])sheet.setBoundVariable(field,vars['space-12']);fill(sheet,'surface');sheet.clipsContent=false;sheet.exportSettings=[{format:'PDF'}];
const header=frame(sheet,'Identity and contact',720,8);
await text(header,'Name',data.name,'Name');await text(header,'Positioning',data.subtitle,'Subtitle','muted');
const contact='vickyw.design@gmail.com  ·  vickywang.me  ·  LinkedIn  ·  GitHub';const contactNode=await text(header,'Contact links',contact,'Meta','brand');
for(const [label,url] of [['vickyw.design@gmail.com','mailto:vickyw.design@gmail.com'],['vickywang.me','https://vickywang.me/'],['LinkedIn','https://www.linkedin.com/in/vicky-wyq/'],['GitHub','https://github.com/vicky-wyq']]){const start=contact.indexOf(label);contactNode.setRangeHyperlink(start,start+label.length,{type:'URL',value:url});}
line(sheet,720);
const columns=track(figma.createAutoLayout('HORIZONTAL'));columns.name='Resume columns';sheet.appendChild(columns);columns.resize(720,100);columns.primaryAxisSizingMode='FIXED';columns.counterAxisSizingMode='AUTO';columns.counterAxisAlignItems='MIN';columns.setBoundVariable('itemSpacing',vars['space-8']);columns.fills=[];
const sidebar=frame(columns,'Profile and capabilities',200,24);const main=frame(columns,'Experience and education',488,24);
const profile=frame(sidebar,'Profile',200,8);await label(profile,'PROFILE');await text(profile,'Profile description',data.profile,'Body','muted');
const outcomes=frame(sidebar,'Selected outcomes',200,14);await label(outcomes,'SELECTED OUTCOMES');
for(const item of data.outcomes){const block=frame(outcomes,item.label,200,5);await text(block,'Metric context',item.label,'Meta','muted');await text(block,'Metric value',item.value,'Metric',item.side);await text(block,'Metric description',item.description,'Body','muted');}
const focus=frame(sidebar,'Focus and expertise',200,8);await label(focus,'FOCUS & EXPERTISE');await text(focus,'Expertise',data.focus.join('\n'),'Body','muted');
const tools=frame(sidebar,'Tools',200,8);await label(tools,'TOOLS');await text(tools,'Tools description',data.tools,'Body','muted');
const experience=frame(main,'Experience',488,16);await label(experience,'EXPERIENCE');line(experience,488);
const component=track(figma.createComponent());page.appendChild(component);component.name='Workroom/Resume entry';component.x=1000;component.y=48;component.resize(488,100);component.layoutMode='VERTICAL';component.primaryAxisSizingMode='AUTO';component.counterAxisSizingMode='FIXED';component.itemSpacing=6;component.fills=[];component.description='Editable resume entry. Change title, dates, summary, and bullet content. Body uses native text; the resume is not a raster or PDF background.';
const title=await text(component,'Job title','Company — Role','Job');const date=await text(component,'Dates','Dates','Meta','faint');const summary=await text(component,'Summary','Summary','Body','muted');const bullets=await text(component,'Bullets','• Experience bullet','Body','muted');bullets.paragraphSpacing=7;
for(const t of [title,date,summary,bullets]){const key=component.addComponentProperty(t.name,'TEXT',t.characters);t.componentPropertyReferences={characters:key};}
const summaryVisible=component.addComponentProperty('Show summary','BOOLEAN',true);summary.componentPropertyReferences={...summary.componentPropertyReferences,visible:summaryVisible};
const entries=[];
for(const job of data.jobs){const entry=track(component.createInstance());experience.appendChild(entry);entry.name=job.title;entries.push(entry.id);const overrides={'Job title':job.title,'Dates':job.date,'Summary':job.summary,'Bullets':job.bullets.map(b=>'• '+b.text).join('\n')};
 const updates={};for(const [key,definition] of Object.entries(component.componentPropertyDefinitions)){const field=key.split('#')[0];if(field==='Show summary')updates[key]=!!job.summary;else if(field in overrides)updates[key]=overrides[field];}entry.setProperties(updates);ids.push(...entry.findAll(()=>true).map(n=>n.id)); }

const education=frame(main,'Education',488,8);await label(education,'EDUCATION');line(education,488);await text(education,'Degree and school',data.education.title,'Job');await text(education,'Graduation',data.education.date,'Meta','faint');
const all=sheet.findAll(()=>true);const counts={};for(const node of all)counts[node.type]=(counts[node.type]||0)+1;
const exactText=all.filter(n=>n.type==='TEXT').map(n=>n.characters).join('\n');const missing=[];for(const job of data.jobs){if(!exactText.includes(job.title))missing.push(job.title);for(const b of job.bullets)if(!exactText.includes(b.text))missing.push(b.text);}
figma.viewport.scrollAndZoomIntoView([sheet]);
return {resumeId:sheet.id,entryComponentId:component.id,entryInstanceIds:entries,createdNodeIds:[...new Set(ids)],createdTextStyleIds:styleIds,bounds:{width:sheet.width,height:sheet.height},typeCounts:counts,missingContent:missing,fontFamilies:[...new Set(all.filter(n=>n.type==='TEXT').flatMap(n=>n.getStyledTextSegments(['fontName']).map(s=>s.fontName.family)))],imageFilledNodes:all.filter(n=>'fills'in n&&Array.isArray(n.fills)&&n.fills.some(f=>f.type==='IMAGE')).map(n=>({id:n.id,name:n.name,type:n.type,width:n.width,height:n.height}))};
