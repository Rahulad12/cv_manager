import { Typography } from 'antd'
import PrimaryButton from '../ui/button/Primary'
import { useAppSelector } from '../../Hooks/hook'
import React from 'react'
interface Props {
    title: string
}
const Hero: React.FC<Props> = ({ title }) => {
    const buttonAttributes = useAppSelector(state => state.buttonProps);

    console.log(buttonAttributes);
    return (
        <div className='flex items-center justify-between'>
            <Typography.Title level={2} className='text-blue-700 font-bold'>
                {title}
            </Typography.Title>

            <PrimaryButton {...buttonAttributes} />
        </div>
    )
}

export default Hero
