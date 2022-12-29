import React from 'react'
import styles from './InputGroup.module.css'

interface InputGroupProps {
    type: string
    htmlFor: string
    name: string
    id?: string
    label: string
    value: any
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputGroup({ type = 'text', name, htmlFor, id, label, onChange, value }: InputGroupProps) {
  return (
    <div className={styles.container}>
        <label className={styles.label} htmlFor={htmlFor}>{label}</label>
        <div>
            <input className={styles.input} type={type} name={name} id={id} value={value} onChange={onChange} />
        </div>
    </div>
  )
}
