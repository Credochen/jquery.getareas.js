<?php
include('/var/www/html/new/com.inc.php');
class GetAreas
{
	function getProvince($area_id=null)
	{
		$strPro='SELECT `area_id`,`area_name` FROM `uu_area` WHERE 1=1';
		if(!empty($this->area_id))
		{
			$strPro.=' AND `area_id`="'.$area_id.'"';
		}
		$strPro.=' AND `area_parent_id`=0 ORDER BY `area_id` ASC';
		$aPros=array();
		$GLOBALS['le']->query($strPro);
		while($rows=$GLOBALS['le']->fetch_assoc())
		{
			$aPros[]=$rows;
		}
		return json_encode($aPros);
	}
	function getCity($parentId,$area_deeppath=2,$area_id=null)
	{
		$strCity='SELECT `area_id`,`area_name` FROM `uu_area` WHERE 1=1';
		if(!empty($this->area_id))
		{
			$strCity.=' AND `area_id`="'.$area_id.'"';
		}
		$strCity.=' AND `area_parent_id`="'.$parentId.'" AND `area_deeppath`="'.$area_deeppath.'" ORDER BY `area_id` ASC';
		$aCity=array();
		$GLOBALS['le']->query($strCity);
		while ($rows=$GLOBALS['le']->fetch_assoc())
		{
			$aCity[]=$rows;
		}
		return json_encode($aCity);
	}
}
$area=new GetAreas();
$act=$_GET['act'];
if($act=='getProvince')
{
	echo $area->getProvince();
}
elseif($act=='getCity')
{
	$parentId=intval($_GET['parentId']);
	$area_deeppath=$_GET['area_deeppath'];
	echo $area->getCity($parentId,$area_deeppath);
}
else
{
	exit('error');
}