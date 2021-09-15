import React from "react";
import {  Drawer, Button, Radio, Space } from 'antd';
import { CalendarTwoTone } from "@ant-design/icons";
import { Calendar } from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel" 
import './Calendario.style.scss'
import "react-multi-date-picker/styles/colors/red.css"


class Calendario extends React.Component {
  
  state = { visible: false};

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  
  setCalendar = (a) => {
    this.props.setCalendario(a);
  };  

  render() {
    const { visible } = this.state;
    return (
      <>

        <Space>          
          <Button className="buttonCal" onClick={this.showDrawer}>
            <CalendarTwoTone twoToneColor="red"></CalendarTwoTone>
          </Button>
        </Space>

        <Drawer
          title="Calendario"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          width={520}
        ><p> </p><p> </p>
          <p>Especifica los días que no vas a estar disponible</p>
          
          <Calendar value={this.props.calendario}
            onChange={(a) => this.setCalendar(a)}
            multiple
            className="red"
            weekStartDayIndex="2"
            format="DD/MM/YYYY"
            minDate={new Date()}
            months={["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]}
            weekDays={["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sab"]} 
            plugins={[
                <DatePanel sort="date" />
            ]} />          
        </Drawer>
      </>
    );
  }
}

export default Calendario;
