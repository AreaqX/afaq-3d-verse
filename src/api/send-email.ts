// pages/api/send-email.ts or app/api/send-email/route.ts
import SibApiV3Sdk from 'sib-api-v3-sdk';
const BREVO_API_KEY = "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";
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = BREVO_API_KEY;

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    
    sendSmtpEmail.templateId = req.body.templateId;
    sendSmtpEmail.to = req.body.to;
    sendSmtpEmail.params = req.body.params;
    
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    res.json({ success: true, messageId: result.messageId });
    
  } catch (error) {
    console.error('Brevo Error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}