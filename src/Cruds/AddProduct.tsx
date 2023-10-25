import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Cascader,
    Checkbox,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Slider,
    Switch,
    TreeSelect,
    Upload,
    Tooltip,
    Rate,
} from 'antd';
import React, { useState } from 'react';
import { BsAlignCenter } from 'react-icons/bs';
interface NumericInputProps {
    style: React.CSSProperties;
    value: string;
    onChange: (value: string) => void;
}

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 18,
            offset: 4,
        },
        sm: {
            span: 16,
            offset: 4,
        },

    },
};
const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const formatNumber = (value: number) => new Intl.NumberFormat().format(value);

const NumericInput = (props: NumericInputProps) => {
    const { value, onChange } = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value: inputValue } = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
            onChange(inputValue);
        }
    };

    // '.' at the end or only '-' in the input box.
    const handleBlur = () => {
        let valueTemp = value;
        if (value.charAt(value.length - 1) === '.' || value === '-') {
            valueTemp = value.slice(0, -1);
        }
        onChange(valueTemp.replace(/0*(\d+)/, '$1'));
    };

    const title = value ? (
        <span className="numeric-input-title">{value !== '-' ? formatNumber(Number(value)) : '-'}</span>
    ) : (
        'Input a number'
    );

    return (
        <Tooltip trigger={['focus']} title={title} placement="topLeft" overlayClassName="numeric-input">
            <Input
                {...props}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Input a number"
                maxLength={16}
            />
        </Tooltip>
    );
};
const AddProduct: React.FC = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");

    const [value, setValue] = useState('');
    const [value1, setValue1] = useState('');
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    const showAlert = () => {
        alert('This is a simple alert message.');
    };
    const onSubmitForm = async e => {
        //   e.preventDefault();
        try {
            const body = { title, price, description, category, image };
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            console.log("yay it been added ");
            window.location.href = "/";
        } catch (err) {
            console.log("nope something wrong happend");
            console.error(err.message);
        }

    };
    const handlePriceChange = (value: string) => {
        setPrice(parseFloat(value));
    };
    return (
        <>

            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{

                    marginTop: 32
                }}
                onFinish={onSubmitForm}
            >
                <Form.Item label="Title" required	 >
                    <Input size='large' placeholder='Product Name ' value={title}
                        onChange={e => setTitle(e.target.value)} />
                </Form.Item>
                <Form.Item label="Price" required	>
                    <NumericInput style={{ width: 100, height: 30 }} value={String(price)}
                        onChange={handlePriceChange} />
                </Form.Item>
                <Form.Item label="Description" required	>
                    <TextArea rows={3} size='large' value={description}
                        onChange={e => setDescription(e.target.value)} />
                </Form.Item>
                <Form.Item label="Category" required	>
                    <Input size='large' placeholder='Category' value={category}
                        onChange={e => setCategory(e.target.value)} />
                </Form.Item>
                <Form.Item label="Upload Image " required 	>
                    <Input size='large' placeholder='Image Link ' value={image}
                        onChange={e => setImage(e.target.value)} />
                </Form.Item>


                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}  >
                        Add Product
                    </Button>
                </Form.Item>

            </Form >
        </>
    );
};

export default () => <AddProduct />;