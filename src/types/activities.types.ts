import { z } from 'zod';
import { zfd } from 'zod-form-data';
export const ActivitySchema = zfd.formData({
  id: zfd.numeric().optional(),
  name: zfd.text(z.string().min(3).max(20))
});
