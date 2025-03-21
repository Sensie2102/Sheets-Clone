export const charToNumber = (letters) =>
    letters
      
      .split("")
      
      .reverse()
      
      .map((letter, index) =>
        index === 0
          ? letter.toLowerCase().charCodeAt(0) - 97
          : 
            letter.toLowerCase().charCodeAt(0) - 97 + 1
      )
      
      .map((base26Number, position) => base26Number * 26 ** position)
     
      .reduce((sum , number) => sum + number, 0);