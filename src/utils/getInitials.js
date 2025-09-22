  // fallback initials
  export const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    return (
      (parts[0]?.[0] || "") +
      (parts.length > 1 ? parts[parts.length - 1][0] : "")
    ).toUpperCase();
  };