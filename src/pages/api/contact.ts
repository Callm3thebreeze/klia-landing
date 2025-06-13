import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = formData.get('name')?.toString();
    const email = formData.get('email')?.toString();
    const company = formData.get('company')?.toString();
    const phone = formData.get('phone')?.toString();
    const message = formData.get('message')?.toString();
    const privacy = formData.get('privacy')?.toString();

    // Validaciones básicas
    if (!name || !email || !message || !privacy) {
      return new Response(
        JSON.stringify({
          error: 'Faltan campos obligatorios',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          error: 'Email no válido',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Preparar el contenido del email
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Nuevo contacto desde KLIA Landing</h2>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #374151;">Información de contacto:</h3>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${company ? `<p><strong>Empresa:</strong> ${company}</p>` : ''}
          ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ''}
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #374151;">Mensaje:</h3>
          <div style="background: white; padding: 15px; border-left: 4px solid #2563eb; border-radius: 4px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
          <p>Este mensaje fue enviado desde el formulario de contacto de KLIA Landing Page el ${new Date().toLocaleString(
            'es-ES'
          )}.</p>
        </div>
      </div>
    `;

    const emailText = `
      Nuevo contacto desde KLIA Landing
      
      Información de contacto:
      - Nombre: ${name}
      - Email: ${email}
      ${company ? `- Empresa: ${company}` : ''}
      ${phone ? `- Teléfono: ${phone}` : ''}
      
      Mensaje:
      ${message}
      
      Enviado el: ${new Date().toLocaleString('es-ES')}
    `; // Enviar email
    const data = await resend.emails.send({
      from: import.meta.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: [import.meta.env.TO_EMAIL || 'jvillar.cmtb@gmail.com'],
      subject: `Nuevo contacto de ${name} - KLIA`,
      html: emailHtml,
      text: emailText,
      reply_to: email,
    });

    console.log('Email enviado:', data);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email enviado correctamente',
        emailId: data.data?.id || 'unknown',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error enviando email:', error);

    return new Response(
      JSON.stringify({
        error: 'Error interno del servidor al enviar el email',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
