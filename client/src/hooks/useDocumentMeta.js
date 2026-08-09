import { useEffect } from 'react';

// Keeps the browser tab title and meta description in sync with admin-edited
// content, so renaming your role/tagline in the admin panel doesn't require
// touching index.html or redeploying.
export function useDocumentMeta({ title, description }) {
  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', description);
    }
  }, [title, description]);
}
