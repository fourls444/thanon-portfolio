export const profile = {
  name: "Thanon Macharoen",
  thaiName: "ธนนท์ มาเจริญ",
  shortName: "Thanon",
  dateOfBirth: "2004-03-06",
  email: "thanon.macharoen@gmail.com",
  phone: "0971592941",
  github: "https://github.com/fourls444",
  linkedin: "https://www.linkedin.com/in/thanon-macharoen/",
  location: "Bangkok, Thailand",
} as const;

export const getAge = (dateOfBirth: string, today = new Date()) => {
  const birthDate = new Date(`${dateOfBirth}T00:00:00`);
  let age = today.getFullYear() - birthDate.getFullYear();
  const birthdayHasPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  if (!birthdayHasPassed) age -= 1;
  return age;
};
