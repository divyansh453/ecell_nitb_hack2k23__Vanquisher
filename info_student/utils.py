from django.core.mail import EmailMessage
from django.utils import timezone    
from io import BytesIO
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
def generate_pdf():
    y = 700
    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=letter)
    p.setFont('Helvetica', 10)
    p.drawString(220, y, "PDF generate at "+timezone.now().strftime('%Y-%b-%d'))
    p.showPage()
    p.save()
    pdf = buffer.getvalue()
    buffer.close()
    return pdf
class Util:
    @staticmethod


    def send_email(request):
        pdf =generate_pdf()
        msg = EmailMessage("title", "content", to=["email@gmail.com"])
        msg.attach('my_pdf.pdf', pdf, 'application/pdf')
        msg.content_subtype = "html"
        msg.send()
