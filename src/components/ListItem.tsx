export function ListItem({ name, activeName, onClick }: { name: string, activeName: string, onClick: any }) {
  return (
    <li className={`list-group-item shadow-lg-pink ${activeName === name ? "active" : ""}`} onClick={() => onClick(name)}>
      {name}
    </li>
  )
}