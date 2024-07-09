import { Activity, Goal, Settings, db } from 'astro:db';

// export default async function () {
//   await db.insert(Settings).values({
//     authorId: '5084555',
//     setupDone: true
//   });

//   await db.insert(Activity).values([
//     {
//       id: 1,
//       name: 'Javascript',
//       authorId: '5084555'
//     },
//     {
//       id: 2,
//       name: 'HTML',
//       authorId: '5084555'
//     },
//     {
//       id: 3,
//       name: 'CSS',
//       authorId: '5084555'
//     },
//     {
//       id: 4,
//       name: 'React',
//       authorId: '5084555'
//     },
//     {
//       id: 5,
//       name: 'Astro',
//       authorId: '5084555'
//     }
//   ]);

//   await db.insert(Goal).values([
//     {
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 2,
//       title: 'Test 002',
//       description:
//         'You can submit a form from an outside button like this:\n<form id="my-form"></form>\n<button type="submit" form="my-form">submit</button>',
//       creationDate: new Date('2024-03-26'),
//       completionDate: new Date('2024-03-26'),
//       updateDate: new Date('2024-03-26'),
//       dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
//       completed: true
//     },
//     {
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 1,
//       title: 'Test 003',
//       description:
//         'You can submit a form from an outside button like this:\n<form id="my-form"></form>\n<button type="submit" form="my-form">submit</button>',
//       creationDate: new Date(),
//       completionDate: new Date(),
//       updateDate: new Date(),
//       dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
//       completed: false
//     },
//     {
//       authorId: '5084555',
//       authorName: 'John',
//       activityId: 1,
//       title: 'Test 004',
//       description:
//         'You can submit a form from an outside button like this:\n<form id="my-form"></form>\n<button type="submit" form="my-form">submit</button>',
//       creationDate: new Date(),
//       completionDate: new Date(),
//       updateDate: new Date(),
//       dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
//       completed: false
//     },
//     {
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 1,
//       title: 'Test 005',
//       description:
//         'You can submit a form from an outside button like this:\n<form id="my-form"></form>\n<button type="submit" form="my-form">submit</button>',
//       creationDate: new Date('2024-03-26'),
//       completionDate: new Date('2024-03-26'),
//       updateDate: new Date('2024-03-26'),
//       dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
//       completed: true
//     },
//     {
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 2,
//       title: 'Test 006',
//       description:
//         'You can submit a form from an outside button like this:\n<form id="my-form"></form>\n<button type="submit" form="my-form">submit</button>',
//       creationDate: new Date('2024-03-26'),
//       completionDate: new Date('2024-03-26'),
//       updateDate: new Date('2024-03-26'),
//       dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
//       completed: true
//     },
//     {
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 1,
//       title: 'Test 007',
//       description:
//         'You can submit a form from an outside button like this:\n<form id="my-form"></form>\n<button type="submit" form="my-form">submit</button>',
//       creationDate: new Date(),
//       completionDate: new Date(),
//       updateDate: new Date(),
//       dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
//       completed: false
//     },
//     {
//       authorId: '5084555',
//       authorName: 'John',
//       activityId: 1,
//       title: 'Test 008',
//       description:
//         'You can submit a form from an outside button like this:\n<form id="my-form"></form>\n<button type="submit" form="my-form">submit</button>',
//       creationDate: new Date(),
//       completionDate: new Date(),
//       updateDate: new Date(),
//       dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
//       completed: false
//     },
//     {
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 1,
//       title: 'Test 009',
//       description:
//         'You can submit a form from an outside button like this:\n<form id="my-form"></form>\n<button type="submit" form="my-form">submit</button>',
//       creationDate: new Date('2024-03-26'),
//       completionDate: new Date('2024-03-26'),
//       updateDate: new Date('2024-03-26'),
//       dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
//       completed: true
//     },
//     {
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 2,
//       title: 'Test 010',
//       description:
//         'You can submit a form from an outside button like this:\n<form id="my-form"></form>\n<button type="submit" form="my-form">submit</button>',
//       creationDate: new Date('2024-03-26'),
//       completionDate: new Date('2024-03-26'),
//       updateDate: new Date('2024-03-26'),
//       dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
//       completed: true
//     },
//     {
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 1,
//       title: 'Test 011',
//       description:
//         'You can submit a form from an outside button like this:\n<form id="my-form"></form>\n<button type="submit" form="my-form">submit</button>',
//       creationDate: new Date(),
//       completionDate: new Date(),
//       updateDate: new Date(),
//       dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
//       completed: false
//     },
//     {
//       authorId: '5084555',
//       authorName: 'John',
//       activityId: 1,
//       title: 'Test 012',
//       description:
//         'You can submit a form from an outside button like this:\n<form id="my-form"></form>\n<button type="submit" form="my-form">submit</button>',
//       creationDate: new Date(),
//       completionDate: new Date(),
//       updateDate: new Date(),
//       dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
//       completed: false
//     },
//     {
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 1,
//       title: 'Test 013',
//       description:
//         'You can submit a form from an outside button like this:\n<form id="my-form"></form>\n<button type="submit" form="my-form">submit</button>',
//       creationDate: new Date('2024-03-26'),
//       completionDate: new Date('2024-03-26'),
//       updateDate: new Date('2024-03-26'),
//       dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
//       completed: true
//     },
//     {
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 2,
//       title: 'Test 014',
//       description:
//         'You can submit a form from an outside button like this:\n<form id="my-form"></form>\n<button type="submit" form="my-form">submit</button>',
//       creationDate: new Date('2024-03-26'),
//       completionDate: new Date('2024-03-26'),
//       updateDate: new Date('2024-03-26'),
//       dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
//       completed: true
//     },
//     {
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 1,
//       title: 'Test 015',
//       description:
//         'You can submit a form from an outside button like this:\n<form id="my-form"></form>\n<button type="submit" form="my-form">submit</button>',
//       creationDate: new Date(),
//       completionDate: new Date(),
//       updateDate: new Date(),
//       dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
//       completed: false
//     },
//     {
//       authorId: '5084555',
//       authorName: 'John',
//       activityId: 1,
//       title: 'Test 016',
//       description:
//         'You can submit a form from an outside button like this:\n<form id="my-form"></form>\n<button type="submit" form="my-form">submit</button>',
//       creationDate: new Date(),
//       completionDate: new Date(),
//       updateDate: new Date(),
//       dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
//       completed: false
//     },
//     {
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 1,
//       title: 'Test 017',
//       description:
//         'You can submit a form from an outside button like this:\n<form id="my-form"></form>\n<button type="submit" form="my-form">submit</button>',
//       creationDate: new Date('2024-03-26'),
//       completionDate: new Date('2024-03-26'),
//       updateDate: new Date('2024-03-26'),
//       dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
//       completed: true
//     },
//     {
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 2,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'John',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 2,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'John',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 2,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'John',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 2,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'John',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 2,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'John',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 2,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'John',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 2,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'John',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 2,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'John',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 2,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'John',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 2,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'John',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 2,
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
//       authorId: '5084555',
//       authorName: 'Dario',
//       activityId: 1,
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
//       authorId: '5084555',
//       authorName: 'John',
//       activityId: 1,
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
  await db.insert(Activity).values([]);
  await db.insert(Goal).values([]);
}
