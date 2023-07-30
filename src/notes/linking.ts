const isUUID = (uuid: string) => {
  const uuidRegex = new RegExp(
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
  );
  return !uuidRegex.test(uuid);
};

export const extractLinks = (text: string) => {
  const links = text.match(/\[.*?\]\(.*?\)/g);
  if (!links) return [];
  const uuids = links
    .map((link) => {
      const uuid = link.match(/\(.*?\)/g)?.[0].slice(1, -1);
      if (!uuid || isUUID(uuid)) return null;

      return uuid;
    })
    .filter((uuid) => uuid !== null) as string[];

  return uuids;
};
