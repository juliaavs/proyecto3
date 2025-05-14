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

    cuerpo = f"""
    Hola {nombre_usuario},

    ¡Bienvenido a nuestra aplicación! Estamos encantados de tenerte a bordo.

    Si tienes alguna pregunta o necesitas ayuda, no dudes en escribirnos.

    Saludos,
    El equipo de la aplicación
    """

    mensaje.attach(MIMEText(cuerpo, 'plain'))

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
