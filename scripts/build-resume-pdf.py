"""Build the downloadable resume from the current EJS source.
Run with Python packages reportlab, beautifulsoup4, and pymupdf installed.
"""
from pathlib import Path
import re, subprocess, html
from bs4 import BeautifulSoup
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = Path(__file__).resolve().parents[1]
rendered = subprocess.check_output(['node', '-e', "require('ejs').renderFile('templates/resume/index.ejs',{templatePath:require('path').resolve('templates')}).then(s=>process.stdout.write(s))"], cwd=ROOT, text=True)
soup = BeautifulSoup(rendered, 'html.parser')
css = (ROOT/'templates/workroom/style.css').read_text()
def token(name):
    value = re.search(r'--'+re.escape(name)+r':\s*([^;]+);', css).group(1)
    return token(value[6:-1]) if value.startswith('var(--') else value
ink, muted, bronze, rule = [HexColor(token(k)) for k in ('text','text-muted','accent','border')]
fonts = Path('/System/Library/Fonts/Supplemental')
pdfmetrics.registerFont(TTFont('ResumeSans',str(fonts/'Arial.ttf')))
pdfmetrics.registerFont(TTFont('ResumeSansBold',str(fonts/'Arial Bold.ttf')))
pdfmetrics.registerFontFamily('ResumeSans',normal='ResumeSans',bold='ResumeSansBold',italic='ResumeSans',boldItalic='ResumeSansBold')
out=ROOT/'output/pdf/Vicky-Wang-Resume.pdf';out.parent.mkdir(parents=True,exist_ok=True)
c=canvas.Canvas(str(out),pagesize=(612,792))
c.setTitle('Vicky Wang - Senior Product Designer');c.setAuthor('Vicky Wang')
# Convert web entities and typographic punctuation into predictable PDF text.
def clean(value):
    return value.replace('\u2014',' - ').replace('\u2013','-').replace('\u2019',"'").replace('\u2192',' to ').replace('\xa0',' ')
def text(el):return clean(el.get_text(' ',strip=True))
def rich(el):
    raw=clean(el.decode_contents())
    raw=re.sub(r'</?span[^>]*>','',raw)
    return raw.replace('<strong>','<b>').replace('</strong>','</b>')
def para(content,x,y,w,size=9.3,leading=12.8,bold=False,color=None):
    style=ParagraphStyle('text',fontName='ResumeSansBold' if bold else 'ResumeSans',fontSize=size,leading=leading,textColor=color or muted)
    p=Paragraph(content,style);_,h=p.wrap(w,1000);p.drawOn(c,x,y-h);return y-h

def label(t,x,y,w):
    y=para(html.escape(t.upper()),x,y,w,8,11,True,bronze)
    return y-8

def line(x,y,w):
    c.setStrokeColor(rule);c.setLineWidth(.5);c.line(x,y,x+w,y)

left,sw,gap,right,rw=36,153,24,213,363
# Name and positioning keep the web hierarchy, with a print-appropriate scale.
y=752
y=para(html.escape(text(soup.select_one('.resume-hero h1'))),left,y,540,25,29,True,ink)-6
y=para(html.escape(text(soup.select_one('.resume-subtitle'))),left,y,540,10.5,14,color=muted)-10
contact='<link href="mailto:vickyw.design@gmail.com">vickyw.design@gmail.com</link>  |  <link href="https://vickywang.me/">vickywang.me</link>  |  <link href="https://www.linkedin.com/in/vicky-wyq/">LinkedIn</link>  |  <link href="https://github.com/vicky-wyq">GitHub</link>'
y=para(contact,left,y,540,8.8,12,color=bronze)-13
line(left,y,540);top=y-20
# Sidebar.
y=label('Profile',left,top,sw)
y=para(html.escape(text(soup.select_one('.resume-profile'))),left,y,sw,9,12.7)-20
y=label('Selected outcomes',left,y,sw)
for item in soup.select('.resume-outcomes .outcome-item'):
    color=HexColor(token('demand-color' if item.get('data-side')=='demand' else 'supply-color'))
    y=para(html.escape(text(item.select_one('dt'))),left,y,sw,8.3,11,color=muted)-3
    y=para(html.escape(text(item.select_one('.outcome-value'))),left,y,sw,9.5,12,True,color)-2
    y=para(html.escape(text(item.select_one('.outcome-description'))),left,y,sw,8.7,12)-12

y-=5;y=label('Focus & expertise',left,y,sw)
for pill in soup.select('.resume-pill'):
    y=para(html.escape(text(pill)),left,y,sw,8.8,12.5)-3

y-=15;y=label('Tools',left,y,sw)
y=para(html.escape(text(soup.select_one('.resume-tools'))),left,y,sw,8.8,12.5)
sidebar_bottom=y
# Experience remains the visually dominant column.
y=label('Experience',right,top,rw)
for job in soup.select('.resume-job'):
    h=job.select_one('h3');role=h.select_one('span')
    company=h.get_text(' ',strip=True).split('—')[0].strip()
    y=para(html.escape(company),right,y,rw,11,14,True,ink)-2
    y=para(html.escape(text(role).lstrip(' -')),right,y,rw,9.4,12,True,ink)-3
    y=para(html.escape(text(job.select_one('.resume-job-date'))),right,y,rw,8,10.5,color=muted)-7
    summary=job.select_one('.resume-job-summary')
    if summary:y=para(html.escape(text(summary)),right,y,rw,9.1,12.5)-7
    for bullet in job.select('.resume-job-list li'):
        c.setFillColor(bronze);c.circle(right+2,y-4,1.1,fill=1,stroke=0)
        y=para(rich(bullet),right+10,y,rw-10,9.1,12.2)-4
    y-=7
    line(right,y,rw);y-=10

y=label('Education',right,y,rw)
edu=soup.select_one('.resume-edu')
y=para(html.escape(text(edu.select_one('h3'))),right,y,rw,9.2,12.5,True,ink)-4
y=para(html.escape(text(edu.select_one('.resume-job-date'))),right,y,rw,8.3,11)
assert min(y,sidebar_bottom)>35, f'Content exceeds one page: main={y}, sidebar={sidebar_bottom}'
c.save()
print(f'Created {out}; content bottoms: main={y:.1f}pt, sidebar={sidebar_bottom:.1f}pt')
