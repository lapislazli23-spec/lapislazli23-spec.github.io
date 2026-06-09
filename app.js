const kpis = [
  {name:"アクティブ率",current:75,target:100,progress:0.75},
  {name:"平均購入額",current:80,target:100,progress:0.80},
  {name:"リーダー数",current:60,target:100,progress:0.60},
  {name:"新規リーダー数",current:90,target:100,progress:0.90},
  {name:"売上",current:40,target:100,progress:0.40},
  {name:"顧客数",current:70,target:100,progress:0.70}
];

const projects = [
  {
    name:"Notion移行",
    priority:"高",
    progress:0.75,
    taskDone:15,
    taskTotal:20,
    importance:0.82,
    importanceDone:45,
    importanceTotal:55
  },
  {
    name:"KPI改善",
    priority:"中",
    progress:0.50,
    taskDone:10,
    taskTotal:20,
    importance:0.65,
    importanceDone:13,
    importanceTotal:20
  }
];

function donut(canvasId, value, color){
  new Chart(document.getElementById(canvasId),{
    type:"doughnut",
    data:{
      datasets:[{
        data:[value,1-value],
        backgroundColor:[color,"#e5e7eb"]
      }]
    },
    options:{
  responsive:true,
  maintainAspectRatio:false,
  cutout:"75%",
  plugins:{
    legend:{
      display:false
    }
  }
}
       });
}

const kpiGrid = document.getElementById("kpi-grid");

kpis.forEach((kpi,index)=>{

  const id=`kpi${index}`;

  kpiGrid.innerHTML += `
    let kpiHtml = "";

kpis.forEach((kpi,index)=>{

  const id=`kpi${index}`;

  kpiHtml += `
    （カードHTML）
  `;
});

kpiGrid.innerHTML = kpiHtml;

kpis.forEach((kpi,index)=>{
  donut(`kpi${index}`,kpi.progress,"#dc2626");
});

const projectGrid = document.getElementById("project-grid");

projects.forEach((p,index)=>{

  const progressId=`progress${index}`;
  const importanceId=`importance${index}`;

  const priorityClass =
    p.priority==="高"
      ? "priority-high"
      : p.priority==="中"
      ? "priority-medium"
      : "priority-low";

  projectGrid.innerHTML += `
    <div class="project-card">

  <div class="project-title ${priorityClass}">
    ${p.priority}：${p.name}
  </div>

  <div class="project-charts">

    <div class="project-metric">

      <div class="project-label">
        進捗率
      </div>

      <div class="chart-container project-chart">
        <canvas id="${progressId}"></canvas>

        <div class="chart-center">
          <div class="chart-percent">
            ${Math.round(p.progress*100)}%
          </div>

          <div class="chart-fraction">
            ${p.taskDone}/${p.taskTotal}
          </div>
        </div>

      </div>

    </div>

    <div class="project-metric">

      <div class="project-label">
        重要度
      </div>

      <div class="chart-container project-chart">
        <canvas id="${importanceId}"></canvas>

        <div class="chart-center">
          <div class="chart-percent">
            ${Math.round(p.importance*100)}%
          </div>

          <div class="chart-fraction">
            ${p.importanceDone}/${p.importanceTotal}
          </div>
        </div>

      </div>

    </div>

  </div>

</div>
  `;

  donut(progressId,p.progress,"#2563eb");
  donut(importanceId,p.importance,"#0891b2");
});
