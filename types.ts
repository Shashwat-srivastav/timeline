export interface Moment {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  photoUrl: string;
}

export const DEMO_MOMENTS: Moment[] = [
  {
    id: '1',
    title: 'First Date',
    subtitle: 'Where it all began',
    date: 'February 14, 2023',
    photoUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
  },
  {
    id: '2',
    title: 'The Yes',
    subtitle: 'She said yes!',
    date: 'June 20, 2024',
    photoUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
  }
];