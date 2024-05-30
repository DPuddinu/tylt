import { Category, Goal, Settings, db } from 'astro:db';

// export default async function () {
//   await db.insert(Category).values([
//     {
//       id: 1,
//       name: 'Javascript',
//       authorId: 'dario.puddinu92@gmail.com'
//     },
//     {
//       id: 2,
//       name: 'HTML',
//       authorId: 'dario.puddinu92@gmail.com'
//     },
//     {
//       id: 3,
//       name: 'CSS',
//       authorId: 'dario.puddinu92@gmail.com'
//     },
//     {
//       id: 4,
//       name: 'React',
//       authorId: 'dario.puddinu92@gmail.com'
//     },
//     {
//       id: 5,
//       name: 'Astro',
//       authorId: 'dario.puddinu92@gmail.com'
//     }
//   ]);

//   await db.insert(Goal).values([
//     {
//       authorId: 'dario.puddinu92@gmail.com',
//       authorName: 'Dario',
//       categoryId: 1,
//       title: 'Submit form from outside button',
//       description:
//         'You can submit a form from an outside button like this:\n<form id="my-form"></form>\n<button type="submit" form="my-form">submit</button>',
//       creationDate: new Date('2024-03-26'),
//       completionDate: new Date('2024-03-26'),
//       updateDate: new Date('2024-03-26'),
//       dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
//       completed: true
//     },
//     {
//       authorId: 'dario.puddinu92@gmail.com',
//       authorName: 'Dario',
//       categoryId: 2,
//       title: 'Submit form from outside button',
//       description:
//         'You can submit a form from an outside button like this:\n<form id="my-form"></form>\n<button type="submit" form="my-form">submit</button>',
//       creationDate: new Date('2024-03-26'),
//       completionDate: new Date('2024-03-26'),
//       updateDate: new Date('2024-03-26'),
//       dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
//       completed: true
//     },
//     {
//       authorId: 'dario.puddinu92@gmail.com',
//       authorName: 'Dario',
//       categoryId: 1,
//       title: 'Submit form from outside button',
//       description:
//         'You can submit a form from an outside button like this:\n<form id="my-form"></form>\n<button type="submit" form="my-form">submit</button>',
//       creationDate: new Date(),
//       completionDate: new Date(),
//       updateDate: new Date(),
//       dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
//       completed: false
//     },
//     {
//       authorId: 'dario.puddinu92@gmail.com',
//       authorName: 'John',
//       categoryId: 1,
//       title: 'Submit form from outside button',
//       description:
//         'You can submit a form from an outside button like this:\n<form id="my-form"></form>\n<button type="submit" form="my-form">submit</button>',
//       creationDate: new Date(),
//       completionDate: new Date(),
//       updateDate: new Date(),
//       dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
//       completed: false
//     }
//   ]);
// }
export default async function () {
  await db.insert(Settings).values([]);
  await db.insert(Category).values([]);
  await db.insert(Goal).values([]);
}
