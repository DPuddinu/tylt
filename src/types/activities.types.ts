import { z } from 'zod';
import { zfd } from 'zod-form-data';
export const ActivitySchema = zfd.formData({
  id: zfd.numeric().optional(),
  name: zfd.text(z.string().min(3).max(20)),
  color: zfd.text(z.string().min(7).max(7)),
  icon: zfd.text(
    z
      .string()
      .transform((value) => {
        const startIndex = value.indexOf('icons/');
        const iconPath = value.substring(startIndex ?? 0);
        return iconPath;
      })
      .optional()
  )
});
export type ActivityInsertPayload = z.infer<typeof ActivitySchema>;
