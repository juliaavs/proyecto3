import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import sys

def enviar_correo_bienvenida(destinatario_email, nombre_usuario):
    remitente = 'infopelis123@gmail.com'
    contraseña = 'rkxf zavb olid veaw '

    # Crear el mensaje
    mensaje = MIMEMultipart()
    mensaje['From'] = remitente
    mensaje['To'] = destinatario_email
    mensaje['Subject'] = '¡Bienvenido a la aplicación!'

    cuerpo_html = f"""
    <html>
    <head>
      <style>
        body {{
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          padding: 20px;
        }}
        .container {{
          background-color: #ffffff;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          max-width: 600px;
          margin: auto;
        }}
        h1 {{
          color: #2c3e50;
        }}
        p {{
          font-size: 16px;
          color: #333333;
          line-height: 1.6;
        }}
        .footer {{
          margin-top: 20px;
          font-size: 14px;
          color: #777;
        }}
      </style>
    </head>
    <body>
      <div class="container">
        <h1>¡Bienvenido, {nombre_usuario}!</h1>
        <p>Gracias por registrarte en nuestra aplicación. Estamos encantados de tenerte con nosotros.</p>
        <p>Explora, organiza y disfruta de tus películas favoritas. Si necesitas ayuda, no dudes en contactarnos.</p>
        <p class="footer">El equipo de la aplicación</p>
      </div>
    </body>
    </html>
    """


    mensaje.attach(MIMEText(cuerpo_html, 'html'))

    try:
        # Conexión con el servidor SMTP de Gmail
        servidor = smtplib.SMTP('smtp.gmail.com', 587)
        servidor.starttls()
        servidor.login(remitente, contraseña)
        texto = mensaje.as_string()
        servidor.sendmail(remitente, destinatario_email, texto)
        servidor.quit()
        print("Correo enviado exitosamente.")
    except Exception as e:
        print(f"Error al enviar el correo: {e}")

# Ejemplo de usoif __name__ == "__main__":
if __name__ == "__main__":
    email = sys.argv[1]
    nombre = sys.argv[2]
    enviar_correo_bienvenida(email, nombre)
