const page = await figma.getNodeByIdAsync('252:3');
await figma.setCurrentPageAsync(page);
const existing = page.children.find(n => n.name === 'Workroom · Website thumbnails');
if (existing) return { existingReviewId: existing.id, status: 'Already created; inspect before retrying.' };
await Promise.all(['Regular','Medium','Semibold'].map(style => figma.loadFontAsync({family:'SF Pro',style})));
const created=[]; const variableIds=[]; const styleIds=[];
const track=n=>{created.push(n.id);return n;};
const rgb=hex=>({r:parseInt(hex.slice(1,3),16)/255,g:parseInt(hex.slice(3,5),16)/255,b:parseInt(hex.slice(5,7),16)/255});
const collection=figma.variables.createVariableCollection('Workroom · Thumbnails');
collection.renameMode(collection.modes[0].modeId,'Light');
const mode=collection.modes[0].modeId;
const vars={};
function variable(name,type,value,scopes,syntax){const v=figma.variables.createVariable(name,collection,type);v.scopes=scopes;v.setValueForMode(mode,type==='COLOR'?{...rgb(value),a:1}:value);if(syntax)v.setVariableCodeSyntax('WEB',syntax);vars[name]=v;variableIds.push(v.id);return v;}
for(const [name,hex,syntax] of [
['surface','#fdfdfc','--bg'],['surface-muted','#faf7f3','--surface-muted'],['text','#202020','--text'],['muted','#444444','--text-muted'],['faint','#6b6b6b','--text-faint'],['border','#e2e2df','--border'],['brand','#7a5b43','--bronze'],['supply','#2c6a57','--supply-color'],['demand','#914638','--demand-color'],['saas','#526579','--saas-color']])variable(name,'COLOR',hex,['FRAME_FILL','SHAPE_FILL','TEXT_FILL','STROKE_COLOR'],'var('+syntax+')');
for(const [name,value,syntax] of [['space-2',8,'--space-2'],['space-4',16,'--space-4'],['space-6',24,'--space-6'],['space-8',32,'--space-8'],['space-12',48,'--space-12'],['space-16',64,'--space-16']])variable(name,'FLOAT',value,['GAP'],'var('+syntax+')');
variable('radius','FLOAT',8,['CORNER_RADIUS'],'var(--radius)');
const styles={};
for(const [name,size,fontStyle,leading,tracking] of [['Title',56,'Semibold',112,-2],['Identity',24,'Semibold',130,-1],['Label',16,'Regular',150,8],['Body',20,'Regular',150,0],['Outcome',20,'Medium',150,0]]){
 const style=figma.createTextStyle();style.name='Workroom/Thumbnail/'+name;style.fontName={family:'SF Pro',style:fontStyle};style.fontSize=size;style.lineHeight={unit:'PERCENT',value:leading};style.letterSpacing={unit:'PERCENT',value:tracking};style.description='Workroom typography; SF Pro is the website system-font fallback. Primary web font: General Sans, unavailable in this connection.';styles[name]=style;styleIds.push(style.id);
}
function paint(key){return figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',vars[key]);}
function fill(node,key){node.fills=[paint(key)];}
function gap(node,key){node.setBoundVariable('itemSpacing',vars[key]);}
function pad(node,key){for(const field of ['paddingLeft','paddingRight','paddingTop','paddingBottom'])node.setBoundVariable(field,vars[key]);}
function layout(name,direction='VERTICAL'){const f=track(figma.createAutoLayout(direction));f.name=name;f.fills=[];f.primaryAxisSizingMode='AUTO';f.counterAxisSizingMode='FIXED';return f;}
async function text(parent,name,characters,styleName,color,width){const t=track(figma.createText());t.name=name;t.fontName={family:'SF Pro',style:styleName==='Title'||styleName==='Identity'?'Semibold':styleName==='Outcome'?'Medium':'Regular'};t.characters=characters;parent.appendChild(t);await t.setTextStyleIdAsync(styles[styleName].id);fill(t,color);if(width){t.textAutoResize='HEIGHT';t.resize(width,t.height);}else{t.textAutoResize='WIDTH_AND_HEIGHT';}return t;}
const maxX=Math.max(...page.children.map(n=>n.x+n.width));
const review=layout('Workroom · Website thumbnails');page.appendChild(review);review.x=maxX+160;review.y=0;review.resize(2528,100);review.primaryAxisSizingMode='AUTO';gap(review,'space-16');pad(review,'space-8');
await text(review,'Review title','Workroom · Website thumbnails','Identity','text');
const main=track(figma.createComponent());main.name='Side=Brand';page.appendChild(main);main.x=review.x+review.width+160;main.y=0;main.resize(1200,630);main.layoutMode='VERTICAL';main.primaryAxisSizingMode='FIXED';main.counterAxisSizingMode='FIXED';main.primaryAxisAlignItems='SPACE_BETWEEN';pad(main,'space-16');fill(main,'surface');main.clipsContent=true;main.description='Reusable 1200 × 630 website thumbnail. Edit text properties; choose Brand, Supply, Demand or SaaS. Bound to Workroom code colors and spacing. SF Pro is the system fallback while General Sans is unavailable.';
const properties={};
function expose(node,label){const key=main.addComponentProperty(label,'TEXT',node.characters);node.componentPropertyReferences={characters:key};properties[label]=key;}
const header=layout('Header','HORIZONTAL');main.appendChild(header);header.resize(1072,32);header.primaryAxisSizingMode='FIXED';header.primaryAxisAlignItems='SPACE_BETWEEN';header.counterAxisAlignItems='CENTER';
await text(header,'Designer','Vicky Wang','Identity','text');const kind=await text(header,'Kind','PORTFOLIO','Label','faint');expose(kind,'Kind');
const content=layout('Content');main.appendChild(content);content.resize(1072,100);content.primaryAxisSizingMode='AUTO';gap(content,'space-6');
const meta=layout('Metadata','HORIZONTAL');content.appendChild(meta);meta.resize(1072,32);meta.primaryAxisSizingMode='AUTO';meta.counterAxisAlignItems='CENTER';gap(meta,'space-6');
const badge=layout('Category badge','HORIZONTAL');meta.appendChild(badge);badge.primaryAxisSizingMode='AUTO';badge.counterAxisSizingMode='AUTO';badge.paddingLeft=12;badge.paddingRight=12;badge.paddingTop=6;badge.paddingBottom=6;badge.strokes=[paint('border')];badge.strokeWeight=1;for(const corner of ['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius'])badge.setBoundVariable(corner,vars.radius);
const label=await text(badge,'Category','MARKETPLACE + PLATFORM UX','Label','muted');expose(label,'Category');
const date=await text(meta,'Date','Consumer · B2B · Platforms','Body','faint');expose(date,'Date');
const title=await text(content,'Headline','Senior product designer for work where the hard part is the system.','Title','text',1072);expose(title,'Headline');
const footer=layout('Footer');main.appendChild(footer);footer.resize(1072,64);footer.primaryAxisSizingMode='AUTO';gap(footer,'space-4');
const rule=track(figma.createRectangle());rule.name='Divider';footer.appendChild(rule);rule.resize(1072,1);fill(rule,'border');
const outcome=await text(footer,'Outcome','Complex consumer, B2B, and platform products','Outcome','brand',1072);expose(outcome,'Outcome');
const url=await text(footer,'Website','vickywang.me','Label','faint');
const variants=[main];
for(const [i,name] of ['Supply','Demand','SaaS'].entries()){const c=main.clone();page.appendChild(c);c.name='Side='+name;c.x=main.x;c.y=(i+1)*710;const nodes=c.findAllWithCriteria({types:['TEXT']});for(const t of nodes){if(t.name==='Outcome')fill(t,name.toLowerCase());}created.push(c.id,...c.findAll(()=>true).map(n=>n.id));variants.push(c);}
const masterX=main.x;const set=track(figma.combineAsVariants(variants,page));set.name='Workroom/Website thumbnail';set.x=masterX;set.y=0;set.layoutMode='VERTICAL';set.primaryAxisSizingMode='AUTO';set.counterAxisSizingMode='AUTO';gap(set,'space-8');pad(set,'space-8');
const entries=[
{slug:'landing',side:'Brand',category:'MARKETPLACE + PLATFORM UX',date:'Consumer · B2B · Platforms',title:'Senior product designer for work where the hard part is the system.',outcome:'Marketplaces · Operational workflows · Partner integrations',kind:'PORTFOLIO'},
{slug:'inventory',side:'Supply',category:'SUPPLY SIDE · INVENTORY',date:'Q3 2025 · BabyQuip',title:'Reducing operational friction across marketplace inventory',outcome:'68% of providers who rated the redesign were satisfied',kind:'CASE STUDY'},
{slug:'vrbo',side:'Demand',category:'DEMAND SIDE · SHOPPING',date:'Q2 2026 · BabyQuip',title:'Turning Vrbo partner traffic into rental intent',outcome:'+60% entry-to-shopping progression · GA4 pre/post, directional',kind:'CASE STUDY'},
{slug:'checkout',side:'Demand',category:'DEMAND SIDE · CHECKOUT',date:'Q2 2026 · BabyQuip',title:'Reducing checkout friction after renters are ready to book',outcome:'76.3% → 79.7% mobile web checkout completion · GA4 pre/post',kind:'CASE STUDY'},
{slug:'provider-app',side:'Supply',category:'SUPPLY SIDE · MOBILE OPERATIONS',date:'Q2 2026 · BabyQuip',title:'Building BabyQuip’s first mobile operations layer',outcome:'Reservations · Customer messages · Urgent updates',kind:'CASE STUDY'},
{slug:'packages',side:'Supply',category:'SUPPLY SIDE · PACKAGE SYSTEM',date:'Q3 2025 · BabyQuip',title:'A scalable package system for marketplace bundles',outcome:'Standardized package discovery before provider selection',kind:'CASE STUDY'},
{slug:'bookyourpet',side:'SaaS',category:'BOOKYOURPET · B2B SAAS',date:'2021–2024',title:'Scaling a provider platform without scaling complexity',outcome:'Service configuration · Provider operations · Subscription onboarding',kind:'CASE STUDY'}
];
const instanceIds=[];let row;
for(const [index,item] of entries.entries()){
 if(index%2===0){row=layout('Thumbnail row '+(Math.floor(index/2)+1),'HORIZONTAL');review.appendChild(row);row.resize(2464,630);row.primaryAxisSizingMode='AUTO';row.counterAxisSizingMode='AUTO';gap(row,'space-16');}
 const variant=variants.find(n=>n.name==='Side='+item.side);const instance=track(variant.createInstance());row.appendChild(instance);instance.name='thumbnail/'+item.slug;instance.resize(1200,630);
 const values={Kind:item.kind,Category:item.category,Date:item.date,Headline:item.title,Outcome:item.outcome};
 // Resolve actual property keys after variant cloning; do not guess generated IDs.
 const definitions=set.componentPropertyDefinitions;const updates={};for(const [label,value] of Object.entries(values)){const key=Object.keys(definitions).find(k=>k.split('#')[0]===label);if(!key)throw new Error('Missing property '+label);updates[key]=value;}for(const node of instance.findAllWithCriteria({types:['TEXT']})){const field={Kind:'Kind','Category':'Category','Date':'Date','Headline':'Headline','Outcome':'Outcome'}[node.name];if(field){await figma.loadFontAsync(node.fontName);node.characters=values[field];}}
 instance.exportSettings=[{format:'PNG',constraint:{type:'SCALE',value:1}}];instanceIds.push({id:instance.id,name:instance.name});created.push(...instance.findAll(()=>true).map(n=>n.id));
}
figma.viewport.scrollAndZoomIntoView([review]);
const nodes=review.findAll(()=>true);const typeCounts={};for(const node of nodes)typeCounts[node.type]=(typeCounts[node.type]||0)+1;
return {reviewId:review.id,componentSetId:set.id,instances:instanceIds,createdNodeIds:[...new Set(created)],collectionId:collection.id,variableIds,styleIds,reviewBounds:{width:review.width,height:review.height},typeCounts,fontFamilies:[...new Set(nodes.filter(n=>n.type==='TEXT').flatMap(n=>n.getStyledTextSegments(['fontName']).map(s=>s.fontName.family)))],imageFilledNodes:nodes.filter(n=>'fills'in n && Array.isArray(n.fills)&&n.fills.some(f=>f.type==='IMAGE')).map(n=>({id:n.id,name:n.name,type:n.type,width:n.width,height:n.height}))};
