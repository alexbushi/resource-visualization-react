export const powerFlowkW = {
  name: 'Power Flow (kW)',
  units: 'kW',
  shouldShow: true,
};
export const powerFlowPercent = {
  name: 'Power Flow (abs %)',
  units: 'abs (%)',
  shouldShow: true,
  legendValues: [100, 50, 0],
};
export const soc = {
  name: 'SOC (%)',
  units: '%',
  shouldShow: true,
  legendValues: [100, 50, 0],
};
export const temperature = {
  name: 'Temperature (°C)',
  units: '°C',
  shouldShow: true,
  legendValues: [45, 22.5, 0],
};
export const status = {
  name: 'Status',
  units: '',
  shouldShow: true,
  legendValues: ['GI', 'CH', 'NK', 'NC', 'SLP', 'EV NC', 'Other'],
};
