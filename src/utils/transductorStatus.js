export function separateInDays (arr, type, today, yesterday, beforeYesterday, occurrences = []) {
  let now = new Date()
  arr.forEach((elem) => {
    let startTime = new Date(elem.start_time)
    let endTime = elem.end_time === null ? new Date() : new Date(elem.end_time)

    let item = {
      ...elem,
      originalType: type,
      type: getOccurenceName(type),
      writtenStartTime: timePassedDays(startTime, endTime, true),
      writtenEndTime: timePassedDays(endTime, now, false),
      info: getInfo(elem, type)
    }
    if (item.end_time === null) {
      occurrences.push(item)
    }
    endTime.setHours(0, 0, 0, 0)
    now.setHours(0, 0, 0, 0)

    let diff = Math.floor((now - endTime) / (1000 * 60 * 60 * 24))

    if (diff === 0) {
      today.push(item)
    } else if (diff === 1) {
      yesterday.push(item)
    } else if (diff === 2) {
      beforeYesterday.push(item)
    }
  })
}

export function getInfo (item, info) {
  if (info === 'conection_fail') {
    return 'Possível queda de energia'
  } else if (info === 'critical_tension' ||
    info === 'precarious_tension') {
    return getPhaseVoltage(item)
  } else if (info === 'phase_drop') {
    return getPhase(item)
  }
}

export function getPhaseVoltage (item) {
  let res = ''
  let isFirst = true

  if (item.data.voltage_a) {
    res += 'A - ' + Math.round(item.data.voltage_a) + 'V '
    isFirst = false
  }
  if (item.data.voltage_b) {
    if (!isFirst) {
      res += ' / '
    }
    res += 'B - ' + Math.round(item.data.voltage_b) + 'V '
    isFirst = false
  }
  if (item.data.voltage_c) {
    if (!isFirst) {
      res += ' / '
    }
    res += 'C - ' + Math.round(item.data.voltage_c) + 'V '
    isFirst = false
  }
  return res
}

export function getPhase (item) {
  let res = ''
  let isFirst = true

  if (item.data.voltage_a) {
    res += 'Fase A '
    isFirst = false
  }
  if (item.data.voltage_b) {
    if (!isFirst) {
      res += ' / '
    }
    res += 'Fase B '
    isFirst = false
  }
  if (item.data.voltage_c) {
    if (!isFirst) {
      res += ' / '
    }
    res += 'Fase C '
    isFirst = false
  }
  return res
}

export function timePassedDays (date, compareDate, isStartTime) {
  let res = ''
  let day = new Date(date)
  let compareDay = new Date(compareDate)

  day.setHours(0, 0, 0, 0)
  compareDay.setHours(0, 0, 0, 0)
  let days = Math.floor((compareDay - day) / (1000 * 60 * 60 * 24))

  if (isStartTime && days > 0) {
    let plural = days > 1 ? 's ' : ' '

    res += days.toString() + ' dia' + plural
  } else {
    let h = date.getHours()
    let min = date.getMinutes()
    res += h.toString() + 'h' + min.toString().padStart(2, 0)
  }
  return res
}

export function getOccurenceName (type) {
  switch (type) {
    case 'critical_tension':
      return 'Tensão crítica'
    case 'precarious_tension':
      return 'Tensão precária'
    case 'phase_drop':
      return 'Queda de Fase'
    default:
      return 'Falha de comunicação'
  }
}

export function timePassed (time) {
  let d = new Date(time)
  let now = new Date()
  let min = Math.floor((now - d) / (1000 * 60))
  if (min > 0) {
    if (min < 60) {
      return min + ' min'
    } else {
      let h = Math.floor(min / 60)
      let m = min % 60
      if (m === 0) {
        return h + ' horas'
      } else {
        return h + 'h ' + m + 'min'
      }
    }
  } else {
    return 'agora'
  }
}
