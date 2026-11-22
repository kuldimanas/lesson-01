import { useState, useEffect, useRef} from 'react'
import courses from '../courses.json'

let activeObservers = 0

type Props = { title: string }

function Task01Child({ title }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)

  console.log('[render] Task01Child, title =', title)

  useEffect(() => {
    const node = rootRef.current
    if (!node) return

    const observer = new MutationObserver((records) => {
      console.log('[DOM] мутаций:', records.length, records.map((r) => `${r.type}@${r.target.nodeName}`))
    })
    observer.observe(node, { childList: true, characterData: true, attributes: true, subtree: true })
    activeObservers++
    console.log('[effect] подписка создана, активных:', activeObservers)

    return () => {
      observer.disconnect()
      activeObservers--
      console.log('[cleanup] подписка снята, активных:', activeObservers)
    }
  }, [])

  return (
    <div ref={rootRef}>
      <h3>{title}</h3>
      <p>Постоянный текст ребёнка</p>
    </div>
  )
}

export default function Task01() {
  const [count, setCount] = useState(0)
  const [index, setIndex] = useState(0)
  const [shown, setShown] = useState(true)

  console.log('[render] Task01 (родитель), count =', count)

  return (
    <section>
      <p>Счётчик родителя: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Счётчик +1</button>
      <button onClick={() => setIndex((i) => (i + 1) % courses.length)}>
        Сменить title ребёнка
      </button>
      <button onClick={() => setShown((s) => !s)}>
        {shown ? 'Размонтировать ребёнка' : 'Смонтировать ребёнка'}
      </button>
      {shown && <Task01Child title={courses[index].title} />}
    </section>
  )
}
