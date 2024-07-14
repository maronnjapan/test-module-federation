import { CSSProperties, ReactNode, useEffect, useState } from "react";

export interface TestProps extends CSSProperties {
  children: ReactNode;
}

export function Test({ children }: TestProps) {
  const [user, setUser] = useState('')
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_EXPORT_COMPONENT_URL + '/api/user')
      const data = await response.json()
      setUser(data.name)
    }
    fetchUsers()
  }, [])
  return (
    <div>
      <p>{user}</p>
      {children}
    </div>
  );
}

export default Test;