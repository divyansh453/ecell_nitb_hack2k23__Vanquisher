import PyPDF2
file=open('sample.pdf',"rb")
reader=PyPDF2.PdfReader(file)
startxref=0
pointer=0

page1=reader.pages[0]
#print(len(reader.pages))
pdf=page1.extract_text()
print(pdf)

