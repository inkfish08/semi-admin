import React from 'react'
import { SplitButtonGroup, Button, Dropdown } from "@douyinfe/semi-ui"
import { IconTreeTriangleDown } from '@douyinfe/semi-icons'

interface DropdownButtonProps{
  value?: string,
  menus: Array<{value:string, label?:string}>,
  onClick: (value:string) => void,
  loading?: boolean
}
export default function DropdownButton(props:DropdownButtonProps){
  const [value, setValue] = React.useState(props.value || (props.menus && props.menus[0].value))
  const label:string|undefined = React.useMemo(()=>{
    const menu = props.menus.find(item=>item.value===value)
    return menu && menu.label
  },[value, props.menus])
  return (
    <SplitButtonGroup>
        <Button loading={props.loading} onClick={()=>{props.onClick && props.onClick(value)}}>{label}</Button>
        <Dropdown showTick clickToHide render={
          <Dropdown.Menu>
            {
            props.menus && props.menus.map((menu,i) =>(
              menu.value ? <Dropdown.Item  key={i} onClick={()=>{setValue(menu.value)}} active={menu.value===value}>{menu.label}</Dropdown.Item>: <Dropdown.Divider  key={i}/>
            ))
            }
          </Dropdown.Menu>
        }>
          <Button icon={<IconTreeTriangleDown/>}/>
        </Dropdown>
    </SplitButtonGroup>
  )
}