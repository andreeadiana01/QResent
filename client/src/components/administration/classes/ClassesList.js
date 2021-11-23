import React, { useEffect, useState } from "react";
import { Avatar, Button, List, Spin } from "antd";
import axios from "axios";
import AddClassModal from "./AddClassModal";

const ClassesList = () => {
    const [loading, setLoading] = useState(true);
    const [classes, setClasses] = useState([]);
    const [modalVisibility, setModalVisibility] = useState(false);

    const toggleModalVisibility = () => {
        setModalVisibility(!modalVisibility);
    }

    const fetchClasses = () => {
        return axios.get('/api/classes/', { headers: { 'Content-Type': 'application/json', } })
            .then(response => setClasses(response.data));
    }

    useEffect(() => {
        fetchClasses().then(() => setLoading(false));
    }, []);

    const getLink = (item) => {
        return 'http://localhost:3000/admin/classes/' + item._id;
    };

    return (
        <div className="content">
            {
                loading ?
                    <Spin size="large"/> :
                    <div>
                        <Button onClick={toggleModalVisibility} type="primary"
                                style={{
                                    marginBottom: 16,
                                }}
                        >
                            Add class
                        </Button>
                        <List
                            itemLayout="horizontal"
                            dataSource={classes}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar style={{
                                                color: '#f56a00',
                                                backgroundColor: '#fde3cf',
                                            }}>
                                                {item.alias}
                                            </Avatar>
                                        }
                                        title={<a href={getLink(item)}>{item.name}</a>}
                                        actions={[<a key="list-loadmore-edit">edit</a>,
                                            <a key="list-loadmore-more">more</a>]}
                                    />
                                </List.Item>
                            )}
                        />
                        <AddClassModal visible={modalVisibility} toggleModalVisibility={toggleModalVisibility}
                                       onAdd={fetchClasses}/>
                    </div>
            }
        </div>
    );
};

export default ClassesList;