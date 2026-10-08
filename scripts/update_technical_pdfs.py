import os, io, urllib.parse, qrcode
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm

OUT="assets/technical-specs"; os.makedirs(OUT,exist_ok=True)
WA="8619167488424"; EMAIL="sales@jingbears.com"; SITE="https://www.jingbears.com"
D={
"f-430s":("F-430S","Spray extraction + steam",[("Power supply","220 V"),("Suction motor","1,000 W"),("Spray motor","40 W"),("Clean-water tank","4 L"),("Recovery tank","12 L"),("Airflow","180 m³/h"),("Hose length","400 cm"),("Power cord","10 m"),("Functions","Spray extraction / steam / vacuum / water suction"),("Dimensions","53 × 37 × 65 cm"),("Net weight","20 kg")]),
"f-660":("F-660","Commercial fabric cleaning",[("Power supply","220 V / 50 Hz"),("Power / suction","1,000 W / 270 mbar"),("Foam motor","100 W"),("Brush motor","40 W"),("Spray motor","22 W × 2"),("Noise level","≤65 dB(A)"),("Inner solution tank","4 L"),("External solution tank","10 L"),("Recovery tank","30 L"),("Soft hose length","4 m"),("Cable","10 m"),("Airflow rate","53 L/s"),("Weight","28 kg"),("Dimension","64 × 42 × 88 cm"),("Safety level","II")]),
"f-680":("F-680","Curtain sofa maintainer & steamer",[("Power supply","220 V / 50 Hz"),("Power / suction","1,000 W / 270 mbar"),("Foam motor","100 W"),("Brush motor","40 W"),("Spray motor","60 W + 22 W × 2"),("Noise level","≤65 dB(A)"),("Inner solution tank","4 L"),("External solution tank","16 L"),("Recovery tank","13 L"),("Soft hose length","4 m"),("Cable","10 m"),("Steam motor","2,600–3,300 W"),("Steam temperature","145 °C"),("Weight","32 kg"),("Dimension","64 × 42 × 88 cm")]),
"f-930":("F-930","3-in-1 cold-water carpet extractor",[("Power supply","220 V / 50 Hz"),("Suction motor","1,000 W"),("Brush motor","120 W"),("Water pump","110 W"),("Clean-water tank","40 L"),("Recovery tank","30 L"),("Working width","450 mm"),("Power cord","15 m"),("Suction","29 kPa"),("Net weight","40 kg")]),
"f-930s":("F-930S","4-in-1 steam carpet extractor",[("Power supply","220 V / 50 Hz"),("Suction motor","1,200 W"),("Brush motor","120 W"),("Water pump","110 W"),("Heater","2,600 W"),("Clean-water tank","40 L"),("Recovery tank","30 L"),("Working width","450 mm"),("Suction","30 kPa"),("Net weight","42 kg")]),
"f-932":("F-932","3-in-1 dual-suction carpet extractor",[("Power supply","220 V / 50 Hz"),("Suction motors","2 × 1,000 W"),("Brush motor","120 W"),("Water pump","110 W"),("Clean-water tank","40 L"),("Recovery tank","30 L"),("Working width","450 mm"),("Power cord","15 m"),("Suction","38 kPa"),("Net weight","40 kg")]),
"l520b-pro":("L520B Pro","Walk-behind floor scrubber",[("Power supply","24 V"),("Scrubbing width","520 mm"),("Squeegee width","830 mm"),("Productivity","2,300 m²/h"),("Brush motor","550 W"),("Vacuum motor","500 W"),("Clean/recovery tanks","50 / 60 L"),("Net weight","158 kg")]),
"l520bq":("L520BQ","Walk-behind floor scrubber",[("Power supply","24 V"),("Scrubbing width","520 mm"),("Squeegee width","830 mm"),("Productivity","2,300 m²/h"),("Brush motor","550 W"),("Vacuum motor","500 W"),("Clean/recovery tanks","50 / 55 L"),("Net weight","159 kg")]),
"l520bt-pro":("L520BT Pro","Drive-assisted floor scrubber",[("Power supply","24 V"),("Scrubbing width","520 mm"),("Squeegee width","830 mm"),("Productivity","2,300 m²/h"),("Brush motor","550 W"),("Vacuum motor","500 W"),("Drive motor","300 W"),("Clean/recovery tanks","50 / 60 L"),("Net weight","167 kg")]),
"l600bt-pro":("L600BT Pro","Drive-assisted floor scrubber",[("Power supply","24 V"),("Scrubbing width","600 mm"),("Squeegee width","830 mm"),("Productivity","2,800 m²/h"),("Brush motors","2 × 380 W"),("Vacuum motor","500 W"),("Drive motor","300 W"),("Clean/recovery tanks","50 / 60 L"),("Net weight","170 kg")]),
"u700":("U700","Large-format floor scrubber",[("Power supply","24 V"),("Scrubbing width","700 mm"),("Squeegee width","900 mm"),("Productivity","3,800 m²/h"),("Brush motors","2 × 400 W"),("Vacuum motor","600 W"),("Drive motor","500 W"),("Clean/recovery tanks","70 / 85 L"),("Net weight","253 kg"),("Noise level","<65 dB(A)")]),
"u800a":("U800A","Large-format floor scrubber",[("Power supply","24 V"),("Scrubbing width","800 mm"),("Squeegee width","1,060 mm"),("Productivity","5,600 m²/h"),("Brush motors","2 × 500 W"),("Vacuum motor","600 W"),("Drive motor","750 W"),("Clean/recovery tanks","95 / 108 L"),("Net weight","340 kg")]),
"cd1000":("CD1000","Powered floor sweeper",[("Power supply","12 V"),("Cleaning width","1,080 mm"),("Productivity","4,000 m²/h"),("Main brush","400 mm"),("Side brushes","2"),("Debris / water capacity","25 / 15 L"),("Runtime","2–3 h"),("Net weight","65 kg")]),
"cd200ps":("CD200PS","Manual floor sweeper",[("Cleaning width","1,100 mm"),("Debris bin","55 L"),("Main brush","500 mm"),("Side brushes","300 mm"),("Net weight","28 kg")]),
"f-305":("F-305","Wet & dry vacuum cleaner",[("Power supply","220 V / 50 Hz"),("Rated power","1,000 W"),("Tank capacity","30 L"),("Suction","27 kPa"),("Net weight","11.5 kg")]),
"f-702":("F-702","Wet & dry vacuum cleaner",[("Power supply","220 V / 50 Hz"),("Rated power","2 × 1,000 W"),("Tank capacity","70 L"),("Suction","29 kPa"),("Net weight","27 kg")])
}
S=getSampleStyleSheet()
T=ParagraphStyle("T",parent=S["Title"],fontName="Helvetica-Bold",fontSize=21,leading=24,textColor=colors.HexColor("#17342e"),spaceAfter=4)
N=ParagraphStyle("N",parent=S["Normal"],fontName="Helvetica",fontSize=7.4,leading=9,textColor=colors.HexColor("#566760"))
K=ParagraphStyle("K",parent=S["Normal"],fontName="Helvetica-Bold",fontSize=7.2,leading=9,textColor=colors.HexColor("#7d8d48"))
C=ParagraphStyle("C",parent=S["Normal"],fontName="Helvetica",fontSize=7.3,leading=10,textColor=colors.HexColor("#43564f"))
CT=ParagraphStyle("CT",parent=S["Normal"],fontName="Helvetica-Bold",fontSize=10.5,leading=13,textColor=colors.HexColor("#17342e"))

for slug,(model,desc,rows) in D.items():
    pdf=f"{OUT}/{slug}-JingBear-Technical-Specification.pdf"
    q=qrcode.QRCode(box_size=5,border=2); q.add_data(f"https://wa.me/{WA}?text="+urllib.parse.quote(f"Hi JingBear, I'm interested in {model}. Destination: Quantity: Application:")); q.make(fit=True)
    qb=io.BytesIO(); q.make_image(fill_color="#17342e",back_color="white").save(qb,format="PNG"); qb.seek(0)
    doc=SimpleDocTemplate(pdf,pagesize=A4,rightMargin=16*mm,leftMargin=16*mm,topMargin=13*mm,bottomMargin=10*mm)
    story=[Paragraph("JINGBEAR",K),Paragraph("Technical Specification",T),Paragraph(f"<b>{model}</b> · {desc}",N),Spacer(1,6)]
    data=[[Paragraph("<b>Parameter</b>",N),Paragraph("<b>Documented value</b>",N)]]+[[Paragraph(a,N),Paragraph(b,N)] for a,b in rows]
    tb=Table(data,colWidths=[54*mm,116*mm],repeatRows=1)
    tb.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),colors.HexColor("#eef3ed")),("GRID",(0,0),(-1,-1),.35,colors.HexColor("#d9e1da")),("VALIGN",(0,0),(-1,-1),"TOP"),("ROWBACKGROUNDS",(0,1),(-1,-1),[colors.white,colors.HexColor("#fafbf9")]),("LEFTPADDING",(0,0),(-1,-1),7),("RIGHTPADDING",(0,0),(-1,-1),7),("TOPPADDING",(0,0),(-1,-1),4),("BOTTOMPADDING",(0,0),(-1,-1),4)]))
    story += [tb,Spacer(1,5),Paragraph("APPLICATION",K),Paragraph("Professional commercial cleaning workflows; final configuration and destination compatibility are confirmed in a written quotation.",N),Spacer(1,5)]
    contact=Table([[Paragraph("NEED THIS CONFIGURATION?",CT),"",""],[Paragraph("Scan to discuss this model on WhatsApp",C),"",""],[Image(qb,width=31*mm,height=31*mm),Paragraph(f"<b>WhatsApp:</b> <link href="https://wa.me/{WA}?text="+urllib.parse.quote("Hi JingBear, I'm interested in "+model+". Destination: Quantity: Application:")+" " color="#168447">Chat on WhatsApp</link><br/><b>Phone:</b> +86 191 6748 8424<br/><b>Email:</b> {EMAIL}<br/><b>Model page:</b> <link href="{SITE}/products/{slug}.html" color="#304d42">Open model page</link><br/><b>Request a quote:</b> <link href="{SITE}/contact.html" color="#304d42">Open RFQ form</link>",C),""]],colWidths=[34*mm,100*mm,36*mm])
    contact.setStyle(TableStyle([("SPAN",(0,0),(-1,0)),("SPAN",(0,1),(-1,1)),("SPAN",(1,2),(-1,2)),("BACKGROUND",(0,0),(-1,-1),colors.HexColor("#eef3ed")),("BOX",(0,0),(-1,-1),.6,colors.HexColor("#cfdacf")),("VALIGN",(0,0),(-1,-1),"MIDDLE"),("LEFTPADDING",(0,0),(-1,-1),8),("RIGHTPADDING",(0,0),(-1,-1),8),("TOPPADDING",(0,0),(-1,-1),5),("BOTTOMPADDING",(0,0),(-1,-1),5)]))
    story += [contact,Spacer(1,4)]
    note="Additional parameters were transcribed from the supplied F-660/F-680 product-sheet screenshots." if slug in ("f-660","f-680") else "Technical figures are based on available product documentation; final configuration and quotation basis are confirmed in writing."
    story.append(Paragraph(note,N)); doc.build(story)

ES_DESC={
"f-430s":"Extracción por pulverización + vapor",
"f-660":"Máquina comercial para limpieza de tejidos",
"f-680":"Máquina de limpieza de tejidos con vapor",
"f-930":"Extractor de alfombras de agua fría 3 en 1",
"f-930s":"Extractor de alfombras con vapor 4 en 1",
"f-932":"Extractor de alfombras 3 en 1 con doble aspiración",
"l520b-pro":"Fregadora de suelos de acompañamiento",
"l520bq":"Fregadora de suelos de acompañamiento",
"l520bt-pro":"Fregadora de suelos con tracción asistida",
"l600bt-pro":"Fregadora de suelos con tracción asistida",
"u700":"Fregadora de suelos de gran formato",
"u800a":"Fregadora de suelos de gran formato",
"cd1000":"Barredora de suelos motorizada",
"cd200ps":"Barredora de suelos manual",
"f-305":"Aspirador comercial húmedo y seco",
"f-702":"Aspirador comercial húmedo y seco"
}
ES_LABELS={
"Power supply":"Alimentación","Suction motor":"Motor de aspiración","Spray motor":"Motor de pulverización","Clean-water tank":"Depósito de agua limpia","Recovery tank":"Depósito de recuperación","Airflow":"Caudal de aire","Hose length":"Longitud de manguera","Power cord":"Cable de alimentación","Functions":"Funciones","Dimensions":"Dimensiones","Net weight":"Peso neto","Power / suction":"Potencia / aspiración","Foam motor":"Motor de espuma","Brush motor":"Motor de cepillo","Noise level":"Nivel de ruido","Inner solution tank":"Depósito interior de solución","External solution tank":"Depósito exterior de solución","Soft hose length":"Longitud de manguera flexible","Cable":"Cable","Airflow rate":"Caudal de aire","Weight":"Peso","Dimension":"Dimensiones","Safety level":"Nivel de seguridad","Suction motors":"Motores de aspiración","Brush motor":"Motor de cepillo","Water pump":"Bomba de agua","Heater":"Calentador","Working width":"Anchura de trabajo","Suction":"Aspiración","Scrubbing width":"Anchura de fregado","Squeegee width":"Anchura de la boquilla","Productivity":"Productividad","Brush motor":"Motor de cepillo","Vacuum motor":"Motor de aspiración","Clean/recovery tanks":"Depósitos de agua limpia / recuperación","Drive motor":"Motor de tracción","Brush motors":"Motores de cepillo","Cleaning width":"Anchura de limpieza","Main brush":"Cepillo principal","Side brushes":"Cepillos laterales","Debris / water capacity":"Capacidad de residuos / agua","Runtime":"Autonomía","Debris bin":"Depósito de residuos","Rated power":"Potencia nominal","Tank capacity":"Capacidad del depósito","Steam motor":"Motor de vapor","Steam temperature":"Temperatura de vapor","Suction":"Aspiración"
}
ES_EXTRA={
"f-430s":"Máquina multifunción para extracción, aspiración y vapor en tejidos e interiores.",
"f-660":"Configuración documentada para limpieza de tapicería, alfombras e interiores, con extracción y agitación mecánica.",
"f-680":"Configuración documentada para limpieza de tejidos con extracción, agitación y sistema de vapor.",
"f-930":"Equipo profesional de extracción de alfombras para aplicaciones comerciales de limpieza.",
"f-930s":"Configuración de extracción de alfombras con sistema de vapor para aplicaciones profesionales.",
"f-932":"Configuración de extracción con dos motores de aspiración para aplicaciones comerciales.",
"l520b-pro":"Fregadora de acompañamiento para superficies de suelo que requieren cobertura y productividad comercial.",
"l520bq":"Configuración de fregadora de acompañamiento con depósito de recuperación de 55 L.",
"l520bt-pro":"Fregadora con motor de tracción para aplicaciones comerciales de limpieza de suelos.",
"l600bt-pro":"Fregadora de mayor anchura de trabajo con motor de tracción para limpieza comercial.",
"u700":"Fregadora de gran formato para superficies comerciales donde importan la cobertura y la productividad.",
"u800a":"Configuración de gran anchura de trabajo para superficies comerciales de mayor tamaño.",
"cd1000":"Barredora motorizada para recogida de residuos en aplicaciones comerciales.",
"cd200ps":"Barredora manual para limpieza de superficies y recogida de residuos sin alimentación eléctrica.",
"f-305":"Aspirador compacto húmedo/seco para limpieza general y aplicaciones comerciales.",
"f-702":"Aspirador de mayor capacidad para aplicaciones comerciales de limpieza húmeda y seca."
}
for slug,(model,desc,rows) in D.items():
    pdf=f"{OUT}/{slug}-JingBear-Technical-Specification-ES.pdf"
    q=qrcode.QRCode(box_size=5,border=2); q.add_data(f"https://wa.me/{WA}?text="+urllib.parse.quote(f"Hola JingBear, me interesa {model}. País de destino: Cantidad: Aplicación:")); q.make(fit=True)
    qb=io.BytesIO(); q.make_image(fill_color="#17342e",back_color="white").save(qb,format="PNG"); qb.seek(0)
    doc=SimpleDocTemplate(pdf,pagesize=A4,rightMargin=16*mm,leftMargin=16*mm,topMargin=13*mm,bottomMargin=10*mm)
    story=[Paragraph("JINGBEAR",K),Paragraph("Especificación técnica",T),Paragraph(f"<b>{model}</b> · {ES_DESC[slug]}",N),Spacer(1,6)]
    data=[[Paragraph("<b>Parámetro</b>",N),Paragraph("<b>Valor documentado</b>",N)]]+[[Paragraph(ES_LABELS.get(a,a),N),Paragraph(b,N)] for a,b in rows]
    tb=Table(data,colWidths=[54*mm,116*mm],repeatRows=1)
    tb.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),colors.HexColor("#eef3ed")),("GRID",(0,0),(-1,-1),.35,colors.HexColor("#d9e1da")),("VALIGN",(0,0),(-1,-1),"TOP"),("ROWBACKGROUNDS",(0,1),(-1,-1),[colors.white,colors.HexColor("#fafbf9")]),("LEFTPADDING",(0,0),(-1,-1),7),("RIGHTPADDING",(0,0),(-1,-1),7),("TOPPADDING",(0,0),(-1,-1),4),("BOTTOMPADDING",(0,0),(-1,-1),4)]))
    story += [tb,Spacer(1,5),Paragraph("APLICACIÓN",K),Paragraph(ES_EXTRA[slug]+" La aplicación concreta y la configuración final se confirman mediante cotización escrita.",N),Spacer(1,5)]
    contact=Table([[Paragraph("¿NECESITAS ESTA CONFIGURACIÓN?",CT),"",""],[Paragraph("Escanea para hablar de este modelo por WhatsApp",C),"",""],[Image(qb,width=31*mm,height=31*mm),Paragraph(f"<b>WhatsApp:</b> <link href="https://wa.me/{WA}?text="+urllib.parse.quote("Hola JingBear, me interesa "+model+". País de destino: Cantidad: Aplicación:")+" " color="#168447">Abrir WhatsApp</link><br/><b>Teléfono:</b> +86 191 6748 8424<br/><b>Email:</b> {EMAIL}<br/><b>Página del modelo:</b> <link href="{SITE}/es/products/{slug}.html" color="#304d42">Abrir página</link><br/><b>Solicitar cotización:</b> <link href="{SITE}/es/contact.html" color="#304d42">Abrir RFQ</link>",C),""]],colWidths=[34*mm,100*mm,36*mm])
    contact.setStyle(TableStyle([("SPAN",(0,0),(-1,0)),("SPAN",(0,1),(-1,1)),("SPAN",(1,2),(-1,2)),("BACKGROUND",(0,0),(-1,-1),colors.HexColor("#eef3ed")),("BOX",(0,0),(-1,-1),.6,colors.HexColor("#cfdacf")),("VALIGN",(0,0),(-1,-1),"MIDDLE"),("LEFTPADDING",(0,0),(-1,-1),8),("RIGHTPADDING",(0,0),(-1,-1),8),("TOPPADDING",(0,0),(-1,-1),5),("BOTTOMPADDING",(0,0),(-1,-1),5)]))
    story += [contact,Spacer(1,4),Paragraph("Los parámetros se basan en la documentación de producto disponible para JingBear. La configuración final, disponibilidad y base de cotización se confirman por escrito.",N)]
    doc.build(story)
