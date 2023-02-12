from django.core.mail import EmailMessage
from django.core.mail import EmailMessage
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from django.core.mail import EmailMultiAlternatives
from email.mime.image import MIMEImage
from datetime import date
import os
class Util:
    @staticmethod
    def send_email(data):
        email=EmailMessage(subject=data['email_subject'],body=data['email_body'],to=(data['to_email'],))
        url=data['url']
        print(url)
        attachment = open(url, 'rb')
        email.attach(url,attachment.read(),'application/pdf')
        email.send()
emails=[]
class Utill:
    @staticmethod
    def send_email(data): 
        html_part = MIMEMultipart(_subtype='related')
      
        a='''<html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  </head>
  <body >
    <h1>Invitation from the Placement Cell of MANIT Bhopal</h1>
    <p>Dear '''+ data['employer'] +''',</p>
    <p>We extend our warm greetings from the Placement Cell of Maulana Azad National Institute of Technology, Bhopal. It is with great pleasure that we write to extend an invitation for your company to participate in our upcoming campus placement drive.</p>
    <p>At MANIT , we have a long-standing tradition of producing highly skilled and well-prepared graduates. We are confident that you will discover a wealth of talented and motivated candidates among our students.</p>
    <p>The placement drive is scheduled to take place on ''' +str(date.today())+ ''' and will comprise presentations by our students, followed by interviews with a carefully selected group of candidates. We believe that this event presents a unique opportunity for your company to connect with our students and identify the right individuals for your organization.</p>
    <p>It would be an honor to have you participate in this event, and we look forward to hearing back from you soon. Should you have any questions or require additional information, please do not hesitate to contact us at '''+ data['phone']+'''.</p>
    <p>Thank you for considering MANIT for your recruitment needs. We hope to welcome you in the near future.</p>
    <p>Sincerely,</p>
    <p>'''+ data['user_name'] +'''</p>
    <p>Placement Cell, MANIT Bhopal</p>
  </body>
</html>'''
        msg = EmailMessage(subject=data['email_subject'],to=(data['to_email'],))
        msg.send()
