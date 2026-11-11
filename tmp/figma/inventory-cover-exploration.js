const page=await figma.getNodeByIdAsync('4:3');await figma.setCurrentPageAsync(page);
const source=await figma.getNodeByIdAsync('4:9');
const duplicate=page.children.find(n=>n.name==='Workroom · Inventory cover exploration');if(duplicate)return {existingId:duplicate.id,status:'Inspect existing exploration before retrying.'};
await Promise.all(['Regular','Medium','Semi Bold'].map(style=>figma.loadFontAsync({family:'Inter',style})));
const created=[];const variableIds=[];const textStyleIds=[];const track=n=>{created.push(n.id);return n;};
const rgb=hex=>({r:parseInt(hex.slice(1,3),16)/255,g:parseInt(hex.slice(3,5),16)/255,b:parseInt(hex.slice(5,7),16)/255});
const collection=figma.variables.createVariableCollection('Workroom · Cover exploration');collection.renameMode(collection.modes[0].modeId,'Light');const mode=collection.modes[0].modeId;const vars={};
function token(name,type,value,scopes,css){const v=figma.variables.createVariable(name,collection,type);v.scopes=scopes;v.setValueForMode(mode,type==='COLOR'?{...rgb(value),a:1}:value);v.setVariableCodeSyntax('WEB','var('+css+')');vars[name]=v;variableIds.push(v.id);}
for(const [name,hex,css]of[['paper','#fdfdfc','--bg'],['neutral','#faf7f3','--surface-muted'],['ink','#202020','--text'],['muted','#444444','--text-muted'],['faint','#6b6b6b','--text-faint'],['border','#e2e2df','--border'],['supply','#2c6a57','--supply-color']])token(name,'COLOR',hex,['FRAME_FILL','SHAPE_FILL','TEXT_FILL','STROKE_COLOR'],css);
for(const [name,value]of[['space-3',12],['space-4',16],['space-6',24],['space-8',32],['space-12',48],['space-16',64]])token(name,'FLOAT',value,['GAP'],'--'+name);
token('radius','FLOAT',24,['CORNER_RADIUS'],'--card-radius');
const styles={};for(const[name,size,fontStyle,tracking]of[['Review',24,'Semi Bold',0],['Heading',21,'Medium',0],['Label',14,'Medium',6],['Body',16,'Regular',0]]){const st=figma.createTextStyle();st.name='Workroom/Covers/'+name;st.fontName={family:'Inter',style:fontStyle};st.fontSize=size;st.lineHeight={unit:'PERCENT',value:150};st.letterSpacing={unit:'PERCENT',value:tracking};st.description='Editable cover exploration. Inter substitutes for unavailable website primary font General Sans.';styles[name]=st;textStyleIds.push(st.id);}
function paint(key){return figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',vars[key]);}
function fill(n,key){n.fills=[paint(key)];}
function pad(n,key){for(const f of ['paddingLeft','paddingRight','paddingTop','paddingBottom'])n.setBoundVariable(f,vars[key]);}
function radius(n){for(const f of ['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius'])n.setBoundVariable(f,vars.radius);}
function flow(parent,name,width,direction='VERTICAL',gap='space-6'){const f=track(figma.createAutoLayout(direction));f.name=name;parent.appendChild(f);f.fills=[];f.resize(width,100);f.primaryAxisSizingMode='AUTO';f.counterAxisSizingMode='FIXED';f.setBoundVariable('itemSpacing',vars[gap]);return f;}
async function text(parent,name,value,role='Body',color='ink',width){const t=track(figma.createText());t.name=name;t.fontName=styles[role].fontName;t.characters=value;parent.appendChild(t);await t.setTextStyleIdAsync(styles[role].id);t.fills=[paint(color)];if(width){t.textAutoResize='HEIGHT';t.resize(width,t.height);}else t.textAutoResize='WIDTH_AND_HEIGHT';return t;}
// Crops keep the original image hash. The source screenshot is a content image,
// not a flattened rendering of the completed new cover.
function crop(parent,name,area,outputWidth){const scale=outputWidth/area.width;const height=area.height*scale;const viewport=track(figma.createFrame());viewport.name=name;parent.appendChild(viewport);viewport.resize(outputWidth,height);viewport.clipsContent=true;viewport.fills=[];radius(viewport);const image=track(source.clone());viewport.appendChild(image);image.name='Original product screenshot · editable crop';image.resize(source.width*scale,source.height*scale);image.x=-area.x*scale;image.y=-area.y*scale;return viewport;}
const maxX=Math.max(...page.children.map(n=>n.x+n.width));
const review=flow(page,'Workroom · Inventory cover exploration',2560);review.x=maxX+160;review.y=0;pad(review,'space-8');fill(review,'paper');
await text(review,'Review title','Inventory cover · Two Workroom directions','Review');
await text(review,'Review note','Original preserved · Product UI unchanged · Inter used as the General Sans substitute','Body','faint');
const columns=flow(review,'Concept comparison',2496,'HORIZONTAL','space-16');columns.counterAxisSizingMode='AUTO';
const colA=flow(columns,'01 · Quiet overview',1200,'VERTICAL','space-4');const colB=flow(columns,'02 · Workflow detail',1200,'VERTICAL','space-4');
await text(colA,'Concept label','01 / QUIET OVERVIEW','Label','supply');
await text(colB,'Concept label','02 / WORKFLOW DETAIL','Label','supply');
function cover(parent,name){const f=flow(parent,name,1200);f.resize(1200,900);f.primaryAxisSizingMode='FIXED';f.counterAxisSizingMode='FIXED';f.primaryAxisAlignItems='CENTER';pad(f,'space-12');fill(f,'neutral');f.clipsContent=true;f.exportSettings=[{format:'PNG',constraint:{type:'SCALE',value:1}}];return f;}
const A=cover(colA,'cover_inventory_quiet-overview');
const overview=crop(A,'Full workspace — original callouts removed',{x:0,y:0,width:802,height:483},1104);overview.strokes=[paint('border')];overview.strokeWeight=1;
await text(colA,'Concept explanation','Recommended for the landing: one generous screenshot, no annotation clutter, warm neutral space.','Body','muted',1200);
const B=cover(colB,'cover_inventory_workflow-detail');B.setBoundVariable('itemSpacing',vars['space-8']);
const filter=flow(B,'Persistent-filter detail',1104,'VERTICAL','space-3');
const filterHeading=flow(filter,'Filter caption',1104,'HORIZONTAL','space-3');filterHeading.counterAxisAlignItems='CENTER';
await text(filterHeading,'Number','01','Label','supply');await text(filterHeading,'Feature','Persistent filters','Heading');
crop(filter,'Filter strip · close crop',{x:0,y:24,width:802,height:146},1104);
const actions=flow(B,'Gear-actions detail',1104,'VERTICAL','space-3');
const actionHeading=flow(actions,'Action caption',1104,'HORIZONTAL','space-3');actionHeading.counterAxisAlignItems='CENTER';
await text(actionHeading,'Number','02','Label','supply');await text(actionHeading,'Feature','Discover, edit, and reorder','Heading');
crop(actions,'Gear workspace · close crop',{x:0,y:174,width:802,height:309},1104);
await text(colB,'Concept explanation','A more explanatory direction: separate detail crops make the filters and inventory actions easier to scan.','Body','muted',1200);
const all=review.findAll(()=>true);const counts={};for(const n of all)counts[n.type]=(counts[n.type]||0)+1;const images=all.filter(n=>'fills'in n&&Array.isArray(n.fills)&&n.fills.some(f=>f.type==='IMAGE')).map(n=>({id:n.id,name:n.name,type:n.type,width:n.width,height:n.height,imageHash:n.fills.find(f=>f.type==='IMAGE').imageHash}));
figma.viewport.scrollAndZoomIntoView([review]);
return {reviewId:review.id,concepts:[{id:A.id,name:A.name,width:A.width,height:A.height},{id:B.id,name:B.name,width:B.width,height:B.height}],createdNodeIds:created,variableCollectionId:collection.id,variableIds,textStyleIds,typeCounts:counts,imageFilledNodes:images,fontFamilies:[...new Set(all.filter(n=>n.type==='TEXT').map(n=>n.fontName.family))],originalPreserved:{id:'4:7'},reviewBounds:{width:review.width,height:review.height}};
