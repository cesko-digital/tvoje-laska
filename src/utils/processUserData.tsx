import type { IMemberResponse } from "app/api/member/member.type";

const dataMap = {
  name: ["1", "1"],
  age: ["1", "2"],
  city: ["1", "3"],
  gender: ["1", "4"],
  region: ["1", "9"],
  searching: ["2", "38"],
  datingStatus: ["2", "45"],
  education: ["2", "52"],
  sexualOrientation: ["2", "61"],
  kids: ["2", "68"],
  kidsPlanning: ["2", "360"],
  socialStatus: ["2", "373"],
  profession: ["2", "675"],
  handicapPhysicalLevel: ["3", "111"],
  handicapPhysical: ["3", "116"],
  handicapMentalLevel: ["3", "133"],
  handicapMental: ["3", "144"],
  statusLifeStyle: ["4", "158"],
  statusLiving: ["4", "169"],
  statusWork: ["4", "286"],
  statusDiet: ["4", "295"],
  statusAlcohol: ["4", "302"],
  statusBelieve: ["4", "309"],
  statusReligion: ["4", "315"],
  statusCar: ["4", "508"],
  eyes: ["5", "85"],
  hairs: ["5", "92"],
  bodyShape: ["5", "102"],
  tattoos: ["5", "153"],
  glasses: ["5", "163"],
  piercing: ["5", "329"],
  height: ["5", "1033"],
  hobbies: ["6", "182"],
  sport: ["7", "252"],
  pet: ["8", "826"],
  petDetail: ["8", "175"],
  petOthers: ["8", "841"],
  attitudeLiving: ["9", "513"],
  attitudeSex: ["9", "518"],
  attitudeWork: ["9", "527"],
  attitudeSexualFidelity: ["9", "532"],
  attitudeKids: ["9", "535"],
  attitudeFamilyRoles: ["9", "538"],
  attitudeLife: ["9", "541"],
  attitudeFriends: ["9", "545"],
  partnerRegion: ["11", "548"],
  partnerGender: ["11", "666"],
  partnerAgeMin: ["11", "673"],
  partnerAgeMax: ["11", "674"],
  partnerCity: ["11", "676"],
  partnerStatus: ["11", "677"],
  partnerEducation: ["11", "690"],
  partnerKids: ["11", "705"],
  partnerKidsPlanning: ["11", "708"],
  partnerBodyShape: ["12", "714"],
  partnerHairs: ["12", "733"],
  partnerLiving: ["12", "761"],
  partnerSmoking: ["12", "772"],
  partnerAlcohol: ["12", "777"],
  partnerBelief: ["12", "808"],
  partnerHobbies: ["12", "814"],
  partnerSport: ["12", "817"],
  partnerPet: ["12", "842"],
  partnerLife: ["13", "845"],
  partnerWork: ["13", "852"],
  partnerFamilyRoles: ["13", "857"],
  partnerKidsAttitude: ["13", "862"],
  partnerSexualFidelity: ["13", "865"],
  partnerSexAttitude: ["13", "868"],
};

export type TUserData = keyof typeof dataMap | "imageThumb" | "imageFull";

export const processUserData = (data: IMemberResponse) => {
  const processedData = new Map<TUserData, string | undefined>();

  for (const [key, indexes] of Object.entries(dataMap)) {
    const value = data.xprofile?.groups[indexes[0]].fields[indexes[1]].value.rendered;
    processedData.set(key as TUserData, value);
  }

  processedData.set("imageThumb", data.avatar_urls?.thumb);
  processedData.set("imageFull", data.avatar_urls?.full);

  return processedData;
};
