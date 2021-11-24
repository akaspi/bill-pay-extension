import { useEffect, useState } from "react"
import { Environment } from "../chromeServices/environmentHandler"

export function useEnvironment() {
    const [environment, setEnvironment] = useState<Environment>('Alpha')

    function onMessage({ popupActionId, environment }: { popupActionId: string, environment: Environment}) {
      console.log('hook hot message', popupActionId, environment);
      if (popupActionId === 'updateEnvironment') {
        setEnvironment(environment);
      }
    }

    useEffect(() => {
      chrome.runtime.onMessage.addListener(onMessage);
      return () => {
        chrome.runtime.onMessage.removeListener(onMessage)
      }
    }, [])

    return environment;
  }