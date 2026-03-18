import { useCallback } from 'react'

export function useSmoothScroll() {
  return useCallback((targetId: string) => {
    // Remove the # if present
    const id = targetId.replace('#', '')
    const element = document.getElementById(id)
    
    if (!element) return

    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      const headerOffset = 80 // navbar height
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    })
  }, [])
}
