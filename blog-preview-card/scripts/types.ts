// DEV.to API types
interface DevToUser {
  name: string;
  website_url: string | null;
  profile_image_90: string;
}

interface DevToArticle {
  title: string;
  description: string;
  url: string;
  cover_image: string | null;
  social_image: string | null;
  published_at: string;
  tag_list: string[];
  tags: string;
  user: DevToUser;
}

export interface DevToApiResponse extends Array<DevToArticle> {}