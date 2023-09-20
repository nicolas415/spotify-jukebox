export function getErrorMessage(error: unknown) {
    if (typeof error === 'string') return error
    else if (error instanceof Error) return error.message
    else return 'Unknown Error'
}

export const getCookieByName = (name: string) => {
    if (!document.cookie) {
        return null
    }

    const cookiesArray = document.cookie.split("; ")

    if (!cookiesArray) {
      return null
    }
  
    const cookie = cookiesArray.find(item => item.startsWith(name))
    
    if (!cookie) {
      return null
    }
    
    const content = cookie.split('=')[1]
    return content
}

export function removeCookieByName(name: string) {
    document.cookie = `${name}=;expires=Thu, 01-Jan-70 00:00:01 GMT;`
}

export function formatDuration(milliseconds: number) {
  
  // Convertir les millisecondes en secondes
  let totalSeconds = Math.floor(milliseconds / 1000);

  // Calculer les minutes et les secondes
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  // Ajouter un zéro devant les chiffres inférieurs à 10 pour obtenir un format MM:SS
  let formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  let formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

  // Retourner la durée formatée
  return formattedMinutes + ":" + formattedSeconds;
}