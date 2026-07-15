export const books = [
  {
    code: 1,
    name: 'הבן החכמים',
    category: 'פנטזיה',
    price: 89.9,
    isBorrowed: false,
    loans: []
  },
  {
    code: 2,
    name: '1000 מילים',
    category: 'מדע בדיוני',
    price: 65.5,
    isBorrowed: true,
    loans: [
      {
        date: '2026-07-10',
        customerCode: 101
      }
    ]
  },
  {
    code: 3,
    name: 'החיים של האמוראים',
    category: 'תנך',
    price: 54.0,
    isBorrowed: false,
    loans: []
  }
];

export default books;
