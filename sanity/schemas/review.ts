import { StarIcon } from '@sanity/icons'

export default {
  name: 'review',
  title: 'Review',
  type: 'document',
  icon: StarIcon,
  fields: [
    {
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: '1 to 5 stars',
      validation: (Rule: any) => Rule.required().min(1).max(5),
    },
    {
      name: 'avatar',
      title: 'Customer Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'comment',
      title: 'Review Comment',
      type: 'text',
      validation: (Rule: any) => Rule.required().min(10),
    },
    {
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      description: 'Only approved reviews will be visible on the website',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'name',
      rating: 'rating',
    },
    prepare({ title, rating }: any) {
      return {
        title: `${title} (${rating} stars)`,
        subtitle: 'Platform Review',
      }
    },
  },
}
