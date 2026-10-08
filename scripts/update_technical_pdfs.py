import os, io, urllib.parse, qrcode
from pypdf import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader

OUT="assets/technical-specs"; WA="8619167488424"; EMAIL="sales@jingbears.com"; SITE="https://www.jingbears.com"

SPECIAL={
"f-660":[("Power supply","220 V / 50 Hz"),("Power / suction","1,000 W / 270 mbar"),("Foam motor","100 W"),("Brush motor","40 W"),("Spray motor","22 W × 2"),("Noise level","≤65 dB(A)"),("Inner solution tank","4 L"),("External solution tank","10 L"),("Recovery tank","30 L"),("Soft hose length","4 m"),("Cable","10 m"),("Airflow rate","53 L/s"),("Weight","28 kg"),("Dimension","64 × 42 × 88 cm"),("Safety level","II")],
"f-930s":[("Power supply","220 V / 50 Hz"),("Suction motor","1,200 W"),("Brush motor","120 W"),("Water pump","110 W"),("Heater","2,600 W"),("Clean-water tank","40 L"),("Recovery tank","30 L"),("Working width","450 mm"),("Suction","30 kPa"),("Net weight","42 kg")],
"f-680":[("Power supply","220 V / 50 Hz"),("Power / suction","1,000 W / 270 mbar"),("Foam motor","100 W"),("Brush motor","40 W"),("Spray motor","60 W + 22 W × 2"),("Noise level","≤65 dB(A)"),("Inner solution tank","4 L"),("External solution tank","16 L"),("Recovery tank","13 L"),("Soft hose length","4 m"),("Cable","10 m"),("Steam motor","2,600–3,300 W"),("Steam temperature","145 °C"),("Weight","32 kg"),("Dimension","64 × 42 × 88 cm")]}

def qr_png(model):
    u=f"https://wa.me/{WA}?text="+urllib.parse.quote(f"Hi JingBear, I'm interested in {model}. Destination: Quantity: Application:")
    q=qrcode.QRCode(box_size=5,border=2); q.add_data(u); q.make(fit=True)
    b=io.BytesIO(); q.make_image(fill_color="#17342e",back_color="white").save(b,format="PNG"); b.seek(0); return b

def overlay(model,slug):
    page=PdfReader(f"{OUT}/{slug}-JingBear-Technical-Specification.pdf").pages[0]
    w=float(page.mediabox.width); h=float(page.mediabox.height)
    packet=io.BytesIO(); c=canvas.Canvas(packet,pagesize=(w,h))
    c.setFillColor(colors.HexColor("#eef3ed")); c.roundRect(42,34,w-84,82,12,fill=1,stroke=0)
    c.setFillColor(colors.HexColor("#17342e")); c.setFont("Helvetica-Bold",9.5); c.drawString(55,99,"NEED THIS CONFIGURATION?")
    c.setFont("Helvetica",7.5); c.drawString(55,86,"Scan to discuss this model on WhatsApp")
    c.drawImage(ImageReader(qr_png(model)),55,44,width=38,height=38,mask='auto')
    c.setFont("Helvetica",7.2); c.drawString(103,72,"WhatsApp: +86 191 6748 8424")
    c.drawString(103,60,f"Email: {EMAIL}"); c.drawString(103,48,f"Model: {SITE}/products/{slug}.html")
    c.save(); packet.seek(0); page.merge_page(PdfReader(packet).pages[0])
    out=PdfWriter(); out.add_page(page); out.write(f"/tmp/{slug}.pdf")

def replace_special(slug,model):
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Table, TableStyle, Spacer
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    p=f"{OUT}/{slug}-JingBear-Technical-Specification.pdf"
    st=getSampleStyleSheet()
    title=ParagraphStyle("t",parent=st["Title"],fontName="Helvetica-Bold",fontSize=21,textColor=colors.HexColor("#17342e"))
    small=ParagraphStyle("s",parent=st["Normal"],fontName="Helvetica",fontSize=7.4,leading=9)
    k=ParagraphStyle("k",parent=st["Normal"],fontName="Helvetica-Bold",fontSize=7.2,textColor=colors.HexColor("#7d8d48"))
    d={"f-930s":"4-in-1 steam carpet extractor","f-660":"Commercial fabric cleaning machine","f-680":"Curtain sofa maintainer & steamer"}[slug]
    story=[Paragraph("JINGBEAR",k),Paragraph("Technical Specification",title),Paragraph(f"<b>{model}</b> · {d}",small),Spacer(1,6)]
    data=[[Paragraph("<b>Parameter</b>",small),Paragraph("<b>Documented value</b>",small)]]+[[Paragraph(a,small),Paragraph(b,small)] for a,b in SPECIAL[slug]]
    t=Table(data,colWidths=[54*mm,116*mm]); t.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),colors.HexColor("#eef3ed")),("GRID",(0,0),(-1,-1),.35,colors.HexColor("#d9e1da")),("VALIGN",(0,0),(-1,-1),"TOP"),("ROWBACKGROUNDS",(0,1),(-1,-1),[colors.white,colors.HexColor("#fafbf9")]),("LEFTPADDING",(0,0),(-1,-1),7),("RIGHTPADDING",(0,0),(-1,-1),7),("TOPPADDING",(0,0),(-1,-1),4),("BOTTOMPADDING",(0,0),(-1,-1),4)]))
    story += [t,Spacer(1,5),Paragraph(("Source note: additional parameters were transcribed from the supplied F-660/F-680 product-sheet screenshots." if slug in ("f-660","f-680") else "Source note: figures are based on the documented JingBear model data used for the technical specification."),small)]
    tmp=f"/tmp/{slug}-base.pdf"; SimpleDocTemplate(tmp,pagesize=A4,rightMargin=16*mm,leftMargin=16*mm,topMargin=14*mm,bottomMargin=36*mm).build(story)
    base=PdfReader(tmp).pages[0]
    packet=io.BytesIO(); c=canvas.Canvas(packet,pagesize=A4); w,h=A4
    c.setFillColor(colors.HexColor("#eef3ed")); c.roundRect(42,34,w-84,82,12,fill=1,stroke=0)
    c.setFillColor(colors.HexColor("#17342e")); c.setFont("Helvetica-Bold",9.5); c.drawString(55,99,"NEED THIS CONFIGURATION?")
    c.setFont("Helvetica",7.5); c.drawString(55,86,"Scan to discuss this model on WhatsApp")
    c.drawImage(qr_png(model),55,44,width=38,height=38,mask='auto')
    c.setFont("Helvetica",7.2); c.drawString(103,72,"WhatsApp: +86 191 6748 8424"); c.drawString(103,60,f"Email: {EMAIL}")
    c.drawString(103,48,f"Model: {SITE}/products/{slug}.html")
    c.save(); packet.seek(0); base.merge_page(PdfReader(packet).pages[0])
    wr=PdfWriter(); wr.add_page(base); wr.write(p)

for fn in os.listdir(OUT):
    if not fn.endswith(".pdf"): continue
    slug=fn[:-len("-JingBear-Technical-Specification.pdf")]
    if slug in ("f-930s","f-660","f-680"): continue
    model={"f-430s":"F-430S","f-930":"F-930","f-930s":"F-930S","f-932":"F-932","l520b-pro":"L520B Pro","l520bq":"L520BQ","l520bt-pro":"L520BT Pro","l600bt-pro":"L600BT Pro","u700":"U700","u800a":"U800A","cd1000":"CD1000","cd200ps":"CD200PS","f-305":"F-305","f-702":"F-702"}.get(slug,slug.upper())
    overlay(model,slug); os.replace(f"/tmp/{slug}.pdf",f"{OUT}/{fn}")
replace_special("f-930s","F-930S"); replace_special("f-660","F-660"); replace_special("f-680","F-680")

# Trigger PDF rebuild after workflow installation.
