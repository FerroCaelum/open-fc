import { extractLinks } from '../linking';

describe('extractLinks', () => {
  it('should return an empty array when there are no links in the text', () => {
    const text = 'This is some text without any links.';
    const links = extractLinks(text);
    expect(links).toEqual([]);
  });

  it('should extract links with valid UUIDs', () => {
    const text =
      'This is a [valid link](123e4567-e89b-12d3-a456-426655440000).';
    const links = extractLinks(text);
    expect(links).toEqual(['123e4567-e89b-12d3-a456-426655440000']);
  });

  it('should ignore links with invalid UUIDs', () => {
    const text = 'This is an [invalid link](not-a-uuid).';
    const links = extractLinks(text);
    expect(links).toEqual([]);
  });

  it('should extract multiple links with valid UUIDs', () => {
    const text =
      'This is a [valid link](123e4567-e89b-12d3-a456-426655440000) and another [valid link](98765432-10ab-cdef-0123-456789abcdef).';
    const links = extractLinks(text);
    expect(links).toEqual([
      '123e4567-e89b-12d3-a456-426655440000',
      '98765432-10ab-cdef-0123-456789abcdef',
    ]);
  });

  it('should ignore links with invalid UUIDs and extract links with valid UUIDs', () => {
    const text =
      'This is an [invalid link](not-a-uuid) and a [valid link](123e4567-e89b-12d3-a456-426655440000).';
    const links = extractLinks(text);
    expect(links).toEqual(['123e4567-e89b-12d3-a456-426655440000']);
  });
});
