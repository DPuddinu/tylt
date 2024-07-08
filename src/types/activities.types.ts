import { z } from 'zod';
import { zfd } from 'zod-form-data';
export const ActivitySchema = zfd.formData({
  id: zfd.numeric().optional(),
  name: zfd.text(z.string().min(3).max(20)),
  color: zfd.text(z.string().min(7).max(7)),
  icon: zfd.text(z.string().min(3).max(20)).optional()
});
