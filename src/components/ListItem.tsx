export function ListItem({ name, activeName, onClick }: { name: string, activeName: string, onClick: any }) {
  return (
    <li className={activeName === name ? "active list-group-item" : "list-group-item" } onClick={() => onClick(name)}>
      {name}
    </li>
  )
}