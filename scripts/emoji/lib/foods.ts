import en from "../annotations/en.json";
import ko from "../annotations/ko.json";

export const foods = [..."🍏🍎🍐🍊🍋🍌🍉🍇🍓🫐🍈🍒🍑🥭🍍🥥🥝🍅🍆🥑🥦🫛🥬🥒🌶🫑🌽🥕🫒🧄🧅🫚🥔🍠🫘🥐🥯🍞🥖🥨🧀🥚🍳🧈🥞🧇🥓🥩🍗🍖🦴🌭🍔🍟🍕🫓🥪🥙🧆🌮🌯🫔🥗🥘🫕🥫🍝🍜🍲🍛🍣🍱🥟🦪🍤🍙🍚🍘🍥🥠🥮🍢🍡🍧🍨🍦🥧🧁🍰🎂🍮🍭🍬🍫🍿🍩🍪🌰🥜🍯🥛🍼🫖☕️🍵🧃🥤🧋🫙🍶🍺🍻🥂🍷🫗🥃🍸🍹🧉🍾🧊🥄🍴🍽🥣🥡🥢🧂"]
  .map(food => {
    const _en = en.annotations.annotations[food]?.tts[0] as string;
    const _ko = ko.annotations.annotations[food]?.tts[0] as string;
    const cp = food.codePointAt(0)!;

    return {
      emoji: food,
      cp,
      svg: `${cp.toString(16)}.svg`,
      en: _en,
      ko: _ko,
    }
  })
  .filter(x => x.en != null && x.ko != null)