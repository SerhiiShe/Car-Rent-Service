import type { GlobalConfig } from 'payload'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact Page Settings',
  access: {
    read: () => true,
    update: ({ req: { user } }: any) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Page Heading',
      defaultValue: 'Get in Touch',
      required: true,
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Page Subheading',
      defaultValue:
        'Have questions about our fleet or want to book a specific car? We are here to help.',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
      defaultValue: '+1 (555) 987-6543',
    },
    {
      name: 'email',
      type: 'text',
      label: 'Email Address',
      defaultValue: 'support@rentcar.com',
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Physical Address',
      defaultValue: '123 Luxury Drive, Manhattan, NY 10001, USA',
    },
    {
      name: 'workingHours',
      type: 'text',
      label: 'Working Hours',
      defaultValue: 'Mon-Sun: 8:00 AM - 10:00 PM',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
    },
    {
      name: 'mapEmbedUrl',
      type: 'text',
      label: 'Google Maps Embed URL',
      admin: {
        description:
          'Go to Google Maps -> Share -> Embed a map -> Copy ONLY the link inside the src="..." attribute.',
      },
      defaultValue:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.91477011208!2d-74.11976321327155!3d40.69740344223377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s',
    },
  ],
}
