import React, { useState } from 'react';
import { Button, Form, Input, Radio } from 'antd';
const Login = () => {
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('USER');
    const onFormLayoutChange = ({ layout }) => {
        setFormLayout(layout);
    };
    // const formItemLayout =
    //     formLayout === 'horizontal'
    //         ? {
    //             labelCol: {
    //                 span: 4,
    //             },
    //             wrapperCol: {
    //                 span: 14,
    //             },
    //         }
    //         : null;
    // const buttonItemLayout =
    //     formLayout === 'horizontal'
    //         ? {
    //             wrapperCol: {
    //                 span: 14,
    //                 offset: 4,
    //             },
    //         }
    //         : null;
    return (
        <Form
            // {...formItemLayout}
            layout={formLayout}
            form={form}
            className=' flex flex-col justify-center h-screen items-center bg-blue-50'
            initialValues={{
                layout: formLayout,
            }}
            onValuesChange={onFormLayoutChange}

        >
            <span className='border-2 w-2/6'>
                <Form.Item label="" name="layout" className='w-full '>
                    <Radio.Group value={formLayout} className=' w-full flex justify-center' >

                        <Radio.Button value="USER" className='text-blue-400 focus:text-red-500'>User</Radio.Button>
                        <Radio.Button value="ADMIN">Admin</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="" className='w-4/5'>
                    <Input placeholder="Email" className='hover:border-blue-500 focus:border-blue-500' />
                </Form.Item>
                <Form.Item label="" className='w-4/5'>
                    <Input placeholder="Password" className='hover:border-blue-500 focus:border-blue-500' />
                </Form.Item>
                <Form.Item className='w-4/5'>
                    <Button type="" className='w-full border-blue-600 hover:bg-blue-600 hover:text-white'>LOGIN</Button>
                </Form.Item>
            </span>
        </Form>
    );
};
export default Login;