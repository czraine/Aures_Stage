import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Box,
  Typography,
  CardMedia
} from '@mui/material';
function TopClient() {
  const [admin, setAdmin] = useState([]);
  async function listeClients() {
    try {
      await fetch(`http://localhost:5000/User `, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
      })
        .then((response) => response.json())
        .then((data) => {
          setAdmin(data);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listeClients();
  }, []);

  return (
    <div className="px-3">
      <h4 className="my-3" style={{ color: 'blue' }}>
        Top Clients
      </h4>
      <div className="row">
        {admin.map((elemnt: any, index: number) => {
          return (
            <div
              className="col-lg-4 col-xl-4 col-md-6 ml-0 col-sm-12 col-xs-12 my-2"
              key={index}
            >
              <CardHeader />
              <Divider />
              <CardContent>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe">
                        {elemnt.username.slice(0, 1)}
                        {elemnt.fullname.slice(0, 1)}
                      </Avatar>
                    }
                    title={elemnt.username}
                    subheader={elemnt.fullname}
                  />
                  <CardMedia
                    sx={{
                      height: 0,
                      paddingTop: '110%' // 16:9
                    }}

                  />
                  <CardContent>
                    <h3>{elemnt.id} € </h3>
                  </CardContent>
                </Card>
              </CardContent>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TopClient;
